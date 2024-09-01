import torch
import time
import sys
from diffusers import FluxTransformer2DModel, FluxPipeline
from transformers import T5EncoderModel, CLIPTextModel
from optimum.quanto import freeze, qfloat8, quantize

def printFlush(text):
    print(text)
    sys.stdout.flush()

bfl_repo = "black-forest-labs/FLUX.1-schnell"
dtype = torch.bfloat16

printFlush("Loading Flux Transformer")
transformer = FluxTransformer2DModel.from_single_file("https://huggingface.co/Kijai/flux-fp8/blob/main/flux1-schnell-fp8.safetensors", torch_dtype=dtype)
printFlush("Quantize")
quantize(transformer, weights=qfloat8)
printFlush("Freeze")
freeze(transformer)

printFlush("From pretrained loading")
text_encoder_2 = T5EncoderModel.from_pretrained(bfl_repo, subfolder="text_encoder_2", torch_dtype=dtype)
printFlush("Quantize")
quantize(text_encoder_2, weights=qfloat8)
printFlush("Freeze")
freeze(text_encoder_2)

print("Loading pipe")
pipe = FluxPipeline.from_pretrained(bfl_repo, transformer=None, text_encoder_2=None, torch_dtype=dtype)
pipe.transformer = transformer
pipe.text_encoder_2 = text_encoder_2

pipe.enable_model_cpu_offload()

pipe.vae.enable_slicing()
pipe.vae.enable_tiling()

pipe.to(dtype)

prompt = "A old man standing up holding a fishing rod with a brown pant and a cap on his head"

def callbackStep(pipe, step_index, timestep, callback_kwargs):
    printFlush(f'&STEP,{step_index},{pipe.num_timesteps}')

    return callback_kwargs


generator = torch.Generator("cpu")

while True:
    printFlush("&INPUT")
    dataPrompt = input()
    dataPrompt = dataPrompt.replace("\n", '')
    data = dataPrompt.split("|")
    width = int(data[0])
    height = int(data[1])
    prompt = data[2]
    
    generator.seed()
    printFlush("&START")
    image = pipe(
        prompt=prompt,
        guidance_scale=0.,
        output_type="pil",
        num_inference_steps=4,
        height=height,
        width=width,
        callback_on_step_end=callbackStep,
        generator=generator
    ).images[0]

    ts = time.time()
    image.save(f'flux-fp8-dev-{ts}.png')
    printFlush(f'&END,flux-fp8-dev-{ts}.png')
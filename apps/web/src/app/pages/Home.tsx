import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Button, CircularProgress, Container, Grid, MenuItem, Paper, Select, Stack, TextField } from "@mui/material"
import {generate, generations, generationProgress} from "../../schemas/images"
import CurrentGeneration from "../components/CurrentGeneration";
import React from "react";

function Home() {
    const { data, loading, refetch } = useQuery(generations);
    const [size, setSize] = React.useState("square");
    const [prompt, setPrompt] = React.useState("");

    const [generateMutation, {
        loading: generateLoading
    }] = useMutation(generate, {
        refetchQueries: [{
            query: generations
        }]
    })

    const generateImage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await generateMutation({
            variables: {
                prompt,
                width: size === "square" ? 1024 : size === "portrait" ? 768 : 1344,
                height: size === "square" ? 1024 : size === "portrait" ? 1344 : 768
            }
        });
    }
    
    setInterval(() => {
        refetch();
    }, 10000);

    let generatedDatas = data?.generations ? [...data.generations] : []
    generatedDatas.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
    });

    return (
        <Container>
            {
                (loading || generateLoading) ?
                <CircularProgress /> :
                <Stack spacing={2}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField label="Prompt" fullWidth multiline value={prompt} onChange={(event) => setPrompt(event.target.value)} />
                            </Grid>
                            <Grid item xs={8}>
                                <Select label="size" fullWidth value={size} onChange={(event) => setSize(event.target.value)}>
                                    <MenuItem value="square">Square</MenuItem>
                                    <MenuItem value="portrait">Portrait</MenuItem>
                                    <MenuItem value="landscape">Landscape</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <Button sx={{height: "100%"}} variant="contained" fullWidth onClick={generateImage}>Generate</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    {
                        generatedDatas.map((generation) => (
                             <CurrentGeneration key={generation.id} generation={generation} />
                        ))
                    }
                </Stack>
            }
        </Container>
    )
}

export default Home;
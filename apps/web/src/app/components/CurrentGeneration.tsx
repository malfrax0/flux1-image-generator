import React from 'react';
import { Grid, Paper, Typography, CircularProgress, LinearProgress, IconButton } from '@mui/material';
import { Generation } from "../../gql/graphql"
import { useMutation } from '@apollo/client';
import { deleteGeneration } from '../../schemas/images';
import { Delete } from '@mui/icons-material';

interface CurrentGenerationProps {
    generation: Generation;
}

const CurrentGeneration = ({generation}: CurrentGenerationProps) => {
    const [intervalId, setIntervalId] = React.useState<number | null>(null);
    const [currentPoint, setCurrentPoint] = React.useState<number>(0);

    const [deleteGenerationMutation] = useMutation(deleteGeneration, {
        refetchQueries: ["Q_GENERATIONS"]
    });

    React.useEffect(() => {
        if (generation.state === "ON_GOING" && !intervalId) {
            const id = window.setInterval(() => {
                setCurrentPoint((currentPoint) => (currentPoint + 1) % 4);
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            window.clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [generation]);    

    const deleteGen = () => {
        deleteGenerationMutation({variables: {id: generation.id}});
    }

    const pointString = ".".repeat(currentPoint);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h6">{generation.prompt}</Typography>
                    <Typography variant="body2">{generation.width}x{generation.height}</Typography>
                </Grid>
                <Grid item xs={2} sx={{justifyContent: "right", display: "flex"}}>
                    <IconButton onClick={() => deleteGen()}><Delete /></IconButton>
                </Grid>
                <Grid item xs={12} sx={{justifyContent: generation.state === "ON_GOING" ? "left" : "center", display: "flex"}}>
                    {
                        generation.state === "FINISHED" ?
                        <img style={{maxHeight: "256px"}} src={`data:image/png;base64, ${generation.image}`} alt={generation.prompt} /> :
                        <Typography variant="body2">{generation.state === "QUEUED" ? "Queued" : `Generating${pointString}`}</Typography>
                    }
                </Grid>
                {
                    generation.state !== "FINISHED" &&
                    <Grid item xs={12}>
                        <LinearProgress value={generation.progress * 100} variant={generation.state == "QUEUED" ? "indeterminate" : "determinate"} />
                    </Grid>
                }
            </Grid>
        </Paper>
    );
};

export default CurrentGeneration;
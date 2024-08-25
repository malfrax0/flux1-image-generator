import { Container, Skeleton } from "@mui/material"
import React from "react";

function Home() {
    return (
        <Container>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="rounded" height={200} />
        </Container>
    )
}

export default Home;
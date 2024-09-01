import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Routes from './Router';
import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, createTheme } from '@mui/material';
import BottomBar from './components/BottomBar';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const router = createBrowserRouter(Routes);

const theme = createTheme({
  palette: {
    mode: "dark"
  }
})

const client = new ApolloClient({
  uri: "http://localhost:8001/graphql",
  cache: new InMemoryCache()
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Box sx={{height: 64}}></Box>
        <BottomBar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

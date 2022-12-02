import React from "react";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Providers } from "./components/Providers";
import { Hero } from "./components/Hero";
import { ArmySelector } from "./components/ArmySelector";
import { ArmyUnitSelector } from "./components/ArmyUnitSelector";
import { ErrorSnackbar } from "./components/ErrorSnackbar";
import { SuccessSnackbar } from "./components/SuccessSnackbar";

function App() {
  return (
    <Providers>
      <CssBaseline />
      <Container maxWidth="lg">
        <Hero />
        <ArmySelector />
        <ArmyUnitSelector />
      </Container>
      <ErrorSnackbar />
      <SuccessSnackbar />
    </Providers>
  );
}

export default App;

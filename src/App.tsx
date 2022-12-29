import React from "react";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Providers } from "./components/Providers";
import { Hero } from "./components/Hero";
import { ArmySelectorForScreenSize } from "./components/ArmySelector";
import { ArmyUnitSelector } from "./components/ArmyUnitSelector";
import { ErrorSnackbar } from "./components/ErrorSnackbar";
import { SuccessSnackbar } from "./components/SuccessSnackbar";
import { StickyBottomBar } from "./components/StickyBottomBar";
import { AppBarWithMenu } from './components/AppBar';

function App() {
  return (
    <Providers>
      <CssBaseline />
      <AppBarWithMenu />
      <Container maxWidth="lg" sx={{ p: { xs: "8px", sm: "16px" } }}>
        <Hero />
        <ArmySelectorForScreenSize />
        <ArmyUnitSelector />
      </Container>
      <ErrorSnackbar />
      <SuccessSnackbar />
      <StickyBottomBar />
    </Providers>
  );
}

export default App;

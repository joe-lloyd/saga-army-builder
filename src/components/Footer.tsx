import { IconButton, useTheme } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import Divider from "@mui/material/Divider";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Divider sx={{ mt: "16px" }} />
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.default,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginRight: theme.spacing(1),
            }}
          >
            Found a bug? Reach me on{" "}
            <IconButton
              aria-label="Twitter"
              href="https://twitter.com/Josephl83378898"
              target="_blank"
              rel="noopener"
            >
              <TwitterIcon />
            </IconButton>
            or if you're a real Chad add an issue to my{" "}
            <IconButton
              aria-label="GitHub"
              href="https://github.com/joe-lloyd/saga-army-builder/issues"
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon />
            </IconButton>
          </span>
        </div>
      </footer>
    </>
  );
};

export { Footer };

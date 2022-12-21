import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { UnitContext } from "../contexts/unitContext";
import { Unit, UnitDetails } from "../ArmyUnitTypes";
import { combinedUnits } from "../helpers/combinedUnits";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ArmyViewerInterface {
  units: { [key: string]: UnitDetails<Unit> };
}

const ArmyViewerDesktop: React.FC<ArmyViewerInterface> = ({ units }) => {
  return (
    <Box sx={style}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Unit</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Equipment&nbsp;Options</TableCell>
              <TableCell align="right">Armour&nbsp;Melee(Shooting)</TableCell>
              <TableCell align="right">
                Aggression&nbsp;Melee(Shooting)
              </TableCell>
              <TableCell align="right">Special Rules</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(units).map((unit) => (
              <TableRow
                key={unit.equipmentOptions}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {unit.unit}
                </TableCell>
                <TableCell align="right">{unit.unitSize}</TableCell>
                <TableCell align="right">{unit.equipmentOptions}</TableCell>
                <TableCell align="right">{`${unit.armour.melee}(${unit.armour.shooting})`}</TableCell>
                <TableCell align="right">{`${unit.aggression.melee}(${unit.aggression.shooting})`}</TableCell>
                <TableCell align="right" width={250}>
                  {unit.specialRules.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const ArmyViewerMobile: React.FC<
  ArmyViewerInterface & {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ units, setOpen }) => {
  return (
    <Container>
      <IconButton
        aria-label={"close-units-list"}
        onClick={() => setOpen(false)}
        sx={{
          position: "fixed",
          top: "8px",
          right: "8px",
        }}
      >
        <CloseIcon />
      </IconButton>
      {Object.values(units).map((unit) => (
        <Card sx={{ marginBottom: "8px" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {unit.unit}:{" "}
              {unit.equipmentOptions === "None" ? "" : unit.equipmentOptions} (
              {unit.unitSize})
            </Typography>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "8px" }} align="left">
                    Armour Melee(Shooting)
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }} align="left">
                    Aggression Melee(Shooting)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{ padding: "8px" }}
                    align="center"
                  >{`${unit.armour.melee}(${unit.armour.shooting})`}</TableCell>
                  <TableCell
                    sx={{ padding: "8px" }}
                    align="center"
                  >{`${unit.aggression.melee}(${unit.aggression.shooting})`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {!!unit.specialRules.length && (
              <Typography variant="body2" component="p">
                Special rules: {unit.specialRules.join(", ")}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

const ArmyViewer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { setOpen: React.Dispatch<React.SetStateAction<boolean>> }
> = ({ setOpen }) => {
  const theme = useTheme();
  const isScreenSizeLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const { units } = React.useContext(UnitContext);

  if (!units.length) {
    return null;
  }

  const parsedUnits = combinedUnits(units);

  return isScreenSizeLarge ? (
    <ArmyViewerDesktop units={parsedUnits} />
  ) : (
    <ArmyViewerMobile units={parsedUnits} setOpen={setOpen} />
  );
};

const ArmyViewerForward = React.forwardRef<
  HTMLDivElement,
  { setOpen: React.Dispatch<React.SetStateAction<boolean>> }
>(ArmyViewer);

export { ArmyViewerForward };

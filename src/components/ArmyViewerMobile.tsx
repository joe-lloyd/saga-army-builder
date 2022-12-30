import { Unit, UnitDetails } from "../ArmyUnitTypes";
import React from "react";
import {
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

interface ArmyViewerInterface {
  units: { [key: string]: UnitDetails<Unit> };
}

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
        <Card
          key={`${unit.unit}-${unit.equipmentOptions}`}
          sx={{ marginBottom: "8px" }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              {unit.unit}:{" "}
              {unit.equipmentOptions === "None"
                ? ""
                : unit.equipmentOptions.split(/(?=[A-Z])/).join(" ")}{" "}
              ({unit.unitSize})
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

export default ArmyViewerMobile;

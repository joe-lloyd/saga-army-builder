import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { UnitContext } from "../contexts/unitContext";
import { combinedUnits } from "../helpers/combinedUnits";
import loadable from "@loadable/component";
const ArmyViewerDesktop = loadable(() => import("./ArmyViewerDesktop"));
const ArmyViewerMobile = loadable(() => import("./ArmyViewerMobile"));

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
>((props, ref) => (
  <div ref={ref} tabIndex={0} role="dialog">
    <ArmyViewer {...props} />
  </div>
));

export { ArmyViewerForward };

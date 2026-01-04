import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotDiscovered from "./NotDiscovered.component";

const FilterNew = ({ isFiltering, onToggle, sx }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        ...sx,
        position: "relative",
        display: "flex",
        cursor: "pointer",
        filter: isFiltering ? "none" : "grayscale(1)",
      }}
      onClick={onToggle}
    >
      <Typography
        fontSize={"0.5rem"}
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        ONLY
      </Typography>
      <NotDiscovered />
    </Box>
  );
};

export default FilterNew;

import Typography from "@mui/material/Typography";

const NotDiscovered = ({ sx = {} }) => {
  return (
    <Typography
      variant="h6"
      fontFamily="KHGummi"
      sx={{
        ...sx,
        color: "rgba(255, 255, 0, 0.5)",
        WebkitTextStroke: "1px rgba(255, 165, 0, 0.5)",
        textShadow:
          "1px 1px 0 rgba(255, 165, 0, 0.5), -1px -1px 0 rgba(255, 165, 0, 0.5), 1px -1px 0 rgba(255, 165, 0, 0.5), -1px 1px 0 rgba(255, 165, 0, 0.5)",
      }}
    >
      NEW
    </Typography>
  );
};

export default NotDiscovered;

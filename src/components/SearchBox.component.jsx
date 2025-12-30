import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  compact = false,
}) => {
  return (
    <TextField
      fullWidth
      size={compact ? "small" : "medium"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize={compact ? "small" : "medium"} />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => onChange("")}
              edge="end"
              aria-label="clear search"
            >
              <ClearIcon fontSize={compact ? "small" : "medium"} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: compact ? 1 : 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
};

export default SearchBox;

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

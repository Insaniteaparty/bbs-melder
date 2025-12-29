import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
};

export default SearchBox;

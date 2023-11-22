import { Search } from "@mui/icons-material";
import { Card, IconButton, TextField } from "@mui/material";
const SocialSearchBar = ({ handleSearch }) => {


  return (
    <Card sx={{ p: 1, textAlign: "center", height: '5vh', boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)' }}>
      <TextField
        id="search"
        size="small"
        sx={{ width: 380 }}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Posts"
        InputProps={{
          endAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          )
        }}
      />
    </Card>
  );
};

export default SocialSearchBar;

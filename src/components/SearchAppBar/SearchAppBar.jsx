import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import './SearchAppBar.css';

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SearchAppBar({
  userInput,
  setUserInput,
  getVideos,
  results,
  setVideoId,
  setAutoPlay,
  getRelatedVideos,
  videoId,
  setTitle,
  title
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    event.persist();
    setUserInput(event.target.value);
    console.log(userInput);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    getVideos();
    handleOpen();
    setUserInput("");
  };

  //
  const handleClick = (event, vid) => {
    event.preventDefault();
    setVideoId(vid.id.videoId);
    handleClose();
    setAutoPlay(1);
  };

  useEffect(() => {
    getRelatedVideos();
  }, [videoId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Search onSubmit={(event) => handelSubmit(event)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              type="search"
              name="search"
              value={userInput}
              onChange={(event) => handleChange(event)}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Results:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="search-div-map">
              {results.map((vid, i) => vid.id.videoId === videoId ? setTitle(vid.snippet.title) : (
                <div
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => handleClick(event, vid)}
                >
                  <div className="search-div-map-margin">
                    <img className="search-left-img" src={vid.snippet.thumbnails.medium.url} />
                    <div className="search-right-text">
                      <p className="search-title-text">{vid.snippet.title}</p>
                      <p className="search-desc-text">{vid.snippet.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchAppBar;

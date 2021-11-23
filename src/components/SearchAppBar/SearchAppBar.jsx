import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import API_KEY from '../../YOUTUBE_API_KEY/API_KEY.js';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchAppBar({imageGen, image, title, counter, videoId}) {

  const [results, setResults] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [click, setClick] = useState(true);

    const getSearchResults = async () => {
        await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
        .then((res) => {
            setResults([res.data.items]);
            console.log(res.data);
            console.log(res.data.items[counter].id.videoId);
        });
    }
    const getVideo = async () => {
        await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
        .then((res) => {
            setResults([res.data.items[counter].id.videoId]);
            console.log(res.data.items[counter].id.videoId);
        });
    }

    useEffect(()=> {
      console.log(results);
      },[results]);

    const handleChange = (event) => {
      event.persist();  
      setUserInput(event.target.value);
      console.log(userInput);
      };

    const handelSubmit = (event) => {
      event.preventDefault();
      getSearchResults();
    }
    const handelVideoSubmit = (event) => {
      event.preventDefault();
      getVideo();
      return results[counter].id.videoId;
    }
 


  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <button onClick={()=>setClick(!click)}>a</button>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="open drawer"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    //       >
    //         MUI
    //       </Typography>
    //       <Search>
    //         <SearchIconWrapper>
    //           <SearchIcon />
    //         </SearchIconWrapper>
    //         <StyledInputBase
    //           placeholder="Search…"
    //           inputProps={{ 'aria-label': 'search' }}
    //           // name="search" 
    //           // value={userInput} 
    //           // onChange={handleChange()}
    //         />
    //       </Search>
    //     </Toolbar>
    //   </AppBar>
    <div>
     <form onSubmit={(event)=>handelSubmit(event)}>
       <input type="search" placeholder="Search.." name="search" value={userInput} onChange={(event)=>handleChange(event)}/>
       <button type="submit" >submit</button>
     </form>
     <p>{title}</p>
      <img src={image[0]} height={image[1]} width={image[2]}/>
      <button onClick={()=> imageGen(userInput)}>hi</button>
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      frameborder="0"/>
    </div>
    
    // </Box>
  );
}

export default SearchAppBar;
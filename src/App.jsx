import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';
import API_KEY from './YOUTUBE_API_KEY/API_KEY';
import { NotificationsActiveTwoTone } from '@mui/icons-material';



function App() {
  
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const [counter, setCounter] = useState(0);
  const [videoId, setvideoId] = useState("");

//unshift to add to front of arr

  // const getAllComments = async()=>{
  //   await axios.get("http://localhost:5000/api/comments/")
  //   .then((res) => {
  //     setComments(res.data);
  //     console.log(res.data);
  //   });
  // }

  const uI = SearchAppBar.userInput;

  const getTitleName = async(uI)=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${uI}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> {
      if(counter >= res.data.items.length - 1){
        setCounter(0);
      }
      setTitle([res.data.items[counter].snippet.title]);
    });
  }


  const getVideoImage = async(uI)=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${uI}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> setImage([res.data.items[counter].snippet.thumbnails.default.url, res.data.items[counter].snippet.thumbnails.default.height, res.data.items[counter].snippet.thumbnails.default.width]));
  }
  
  const getVideoId = async(uI)=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${uI}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> setvideoId([res.data.items[counter].id.videoId]));
  }

  const imageGen = (uI) => {
    getTitleName(uI);
    getVideoImage(uI);
    getVideoId(uI)
    setCounter(counter+1);
  }
  
  useEffect(()=> console.log(counter));

  // useEffect(()=> getAllComments(),[counter]);

  return (
    <div>
      <SearchAppBar imageGen={imageGen} title={title} image={image} counter={counter} videoId={videoId}/>
      <p>{title}</p>
      <img src={image[0]} height={image[1]} width={image[2]}/>
      <button onClick={()=> imageGen()}>hi</button>
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1"
      frameborder="0">

      </iframe>
    </div>
  );
}

export default App;

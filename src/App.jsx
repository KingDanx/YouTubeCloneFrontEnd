import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';
import API_KEY from './YOUTUBE_API_KEY/API_KEY';



function App() {
  
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const [counter, setCounter] = useState(0);
  const [videoId, setVideoId] = useState("xW7p3PUMuyk");
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);

//unshift to add to front of arr

  // const getAllComments = async()=>{
  //   await axios.get("http://localhost:5000/api/comments/")
  //   .then((res) => {
  //     setComments(res.data);
  //     console.log(res.data);
  //   });
  // }


  const getTitleName = async()=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> {
      if(counter >= res.data.items.length - 1){
        setCounter(0);
      }
      setTitle([res.data.items[counter].snippet.title]);
    });
  }

  const getSearchResults = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
    .then((res) => {
        setResults(res.data.items);
        console.log(res.data);
        console.log(res.data.items[counter].id.videoId);
    });
}

  const getVideoImage = async()=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> setImage([res.data.items[counter].snippet.thumbnails.default.url, res.data.items[counter].snippet.thumbnails.default.height, res.data.items[counter].snippet.thumbnails.default.width]));
  }
  
  const getVideoId = async()=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> setVideoId([res.data.items[counter].id.videoId]));
  }

  const getVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
    .then((res) => {
        setResults(res.data.items);
        setVideoId(res.data.items[counter].id.videoId)
        console.log(res.data.items);
    });
}

  const imageGen = () => {
    getTitleName();
    getVideoImage();
    getVideoId()
    setCounter(counter+1);
  }

  const handelSubmit = (event) => {
    event.preventDefault();
    // debugger
    getSearchResults();
  }
  
  useEffect(() => {
    getVideos();  
   
  }, [results]);

  return (
    <div>
      <SearchAppBar userInput={userInput} setUserInput={setUserInput} counter={counter} getSearchResults={getSearchResults} results={results} setResults={setResults} handelSubmit={handelSubmit}/>
      <p>{title}</p>
      <img src={image[0]} height={image[1]} width={image[2]}/>
      <button onClick={()=> imageGen()}>hi</button>
     <VideoPlayer videoId={videoId} results={results}/>
    </div>
  );
}

export default App;

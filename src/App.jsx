import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SearchResults from './components/SearchResults/SearchResults';
import Comments from './components/Comments/Comments';
import './App.css';
import API_KEY from './YOUTUBE_API_KEY/API_KEY';
import CommentForm from './components/CommentForm/CommentForm';



function App() {
  
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const [counter, setCounter] = useState(0);
  const [videoId, setVideoId] = useState("");
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [description, setDescription] = useState([]);

//unshift to add to front of arr

  const getAllComments = async()=>{
    await axios.get(`http://localhost:5000/api/comments/`)
    .then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  }


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

  const getVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
    .then((res) => {
        setResults(res.data.items);
        console.log(res.data.items);
    });
}

  const handelSubmit = (event) => {
    event.preventDefault();
    getVideos();
    setUserInput("");
  }
  
  useEffect(() => {
    getAllComments(); 
  }, []);

  return (
    <div>
      <SearchAppBar userInput={userInput} setUserInput={setUserInput} handelSubmit={handelSubmit}/>
      <SearchResults results={results} videoId={videoId} setVideoId={setVideoId}/>
      <VideoPlayer videoId={videoId} results={results} /> 
      <Comments comments={comments} counter={counter} videoId={videoId}/>
      <CommentForm videoId={videoId} setComments={setComments} getAllComments={getAllComments}/>
    </div>
  );
}

export default App;

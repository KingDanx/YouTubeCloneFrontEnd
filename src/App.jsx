import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SearchResults from './components/SearchResults/SearchResults';
import Comments from './components/Comments/Comments';
import RelatedVideos from './components/RelatedVideos/RelatedVideos';
import './App.css';
import API_KEY from './YOUTUBE_API_KEY/API_KEY';
import CommentForm from './components/CommentForm/CommentForm';



function App() {
  
  const [comments, setComments] = useState([]);
  const [videoId, setVideoId] = useState("OcL3wJCE1w8");
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [autoPlay, setAutoPlay] = useState(0);
  const [related, setRelated] = useState([]);
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);

//unshift to add to front of arr

  const getAllComments = async()=>{
    await axios.get(`http://localhost:5000/api/comments/`)
    .then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  } 
  
  const addLike = async(comments) => {
    await axios.put(`http://localhost:5000/api/comments/${comments._id}`, {
            videoID: comments.videoID,
            text: comments.text,
            likes: comments.likes + 1,
            dislikes: comments.dislikes
        })
        .then((res) => {
          getAllComments();
          console.log(res.data.likes);
        });
  }
  const addDislike = async(comments) => {
    await axios.put(`http://localhost:5000/api/comments/${comments._id}`, {
            videoID: comments.videoID,
            text: comments.text,
            likes: comments.likes,
            dislikes: comments.dislikes + 1
        })
        .then((res) => {
          getAllComments();
          console.log(res.data.dislikes);
        });
  }

  const getVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=5&order=viewCount&part=snippet`)
    .then((res) => {
        setResults(res.data.items);
        console.log(res.data.items);
    });
}
  
const getRelatedVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${API_KEY}&part=snippet`)
    .then((res) => {
        setRelated(res.data.items);
        console.log(res.data.items);
    });
}

  useEffect(() => {
    getAllComments(); 
  }, []);

  return (
    <div>
      <SearchAppBar userInput={userInput} setUserInput={setUserInput} getVideos={getVideos} results={results} videoId={videoId} setVideoId={setVideoId} setAutoPlay={setAutoPlay} getRelatedVideos={getRelatedVideos} handleClose={handleClose} setOpen={setOpen}/>
      <VideoPlayer videoId={videoId} results={results} autoPlay={autoPlay} /> 
      <Comments comments={comments} videoId={videoId} addLike={addLike} addDislike={addDislike} />
      <CommentForm videoId={videoId} setComments={setComments} getAllComments={getAllComments}/>
      <RelatedVideos related={related} setVideoId={setVideoId} setAutoPlay={setAutoPlay} getRelatedVideos={getRelatedVideos} videoId={videoId}/>
    </div>
  );
}

export default App;

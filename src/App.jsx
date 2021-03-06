import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Comments from './components/Comments/Comments';
import RelatedVideos from './components/RelatedVideos/RelatedVideos';
import './App.css';
import "./components/Comments/Comments.css";
import API_KEY from './YOUTUBE_API_KEY/API_KEY';
import CommentForm from './components/CommentForm/CommentForm';



function App() {
  
  const [comments, setComments] = useState([]);
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [autoPlay, setAutoPlay] = useState(0);
  const [related, setRelated] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("Rick Astley - Never Gonna Give You Up (Official Music Video)");
  const [description, setDescription] = useState("The official video for “Never Gonna Give You Up” by Rick Astley");

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
 
  const addReplyLike = async(comments, reply) => {
    await axios.put(`http://localhost:5000/api/comments/${comments._id}/replies/${reply._id}`, {
            text: reply.text,
            likes: reply.likes + 1,
            dislikes: reply.dislikes
        })
        .then((res) => {
          getAllComments();
          console.log(res.data.replies);
        });
  }
  const addReplyDislike = async(comments, reply) => {
    await axios.put(`http://localhost:5000/api/comments/${comments._id}/replies/${reply._id}`, {
            text: reply.text,
            likes: reply.likes,
            dislikes: reply.dislikes + 1
        })
        .then((res) => {
          getAllComments();
          console.log(res.data.replies);
        });
  }

  const getVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${userInput}&key=${API_KEY}&maxResults=6&order=viewCount&part=snippet`)
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

const multiSet = (vid) => {
  setTitle(vid.snippet.title);
  setDescription(vid.snippet.description);
}

  useEffect(() => {
    getAllComments(); 
  }, []);

  return (
    <div className="App">
      <SearchAppBar multiSet={multiSet} setTitle={setTitle} userInput={userInput} setUserInput={setUserInput} getVideos={getVideos} results={results} videoId={videoId} setVideoId={setVideoId} setAutoPlay={setAutoPlay} getRelatedVideos={getRelatedVideos} setOpen={setOpen}/>
      <div className="App-grid">
        <div className="App-video-player">
          <VideoPlayer videoId={videoId} results={results} autoPlay={autoPlay} setAutoPlay={setAutoPlay}/>
        </div>
        <div className="App-related-video">
          <RelatedVideos multiSet={multiSet} title={title} setTitle={setTitle} related={related} setVideoId={setVideoId} setAutoPlay={setAutoPlay} getRelatedVideos={getRelatedVideos} videoId={videoId}/> 
        </div>
        
        <div className="comments-margin-top">
          <h2>{title}</h2>
          <h5>{description}</h5>
          <CommentForm videoId={videoId} setComments={setComments} getAllComments={getAllComments}/>
          <Comments comments={comments} videoId={videoId} addLike={addLike} addDislike={addDislike} getAllComments={getAllComments} addReplyDislike={addReplyDislike} addReplyLike={addReplyLike}/>
        </div>
      </div>
      
      
      
    </div>
  );
}

export default App;

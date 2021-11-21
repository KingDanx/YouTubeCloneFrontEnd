import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../src/components/NavBar/NavBar";
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';
import API_KEY from './YOUTUBE_API_KEY/API_KEY';



function App() {
  
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const [counter, setCounter] = useState(0);

//unshift to add to front of arr

  // const getAllComments = async()=>{
  //   await axios.get("http://localhost:5000/api/comments/")
  //   .then((res) => {
  //     setComments(res.data);
  //     console.log(res.data);
  //   });
  // }

  const getTitleName = async()=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=dog&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> {
      if(counter >= res.data.items.length - 1){
        setCounter(0);
      }
      setTitle([res.data.items[counter].snippet.title]);
    });
  }


  const getVideoImage = async()=>{
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=dog&key=${API_KEY}&maxResults=2&order=viewCount&part=snippet`)
    .then(res=> setImage([res.data.items[counter].snippet.thumbnails.default.url, res.data.items[counter].snippet.thumbnails.default.height, res.data.items[counter].snippet.thumbnails.default.width]));
  }

  const imageGen = () => {
    getTitleName();
    getVideoImage();
    setCounter(counter+1);
  }
  
  useEffect(()=> console.log(counter));

  // useEffect(()=> getAllComments(),[counter]);

  return (
    <div>
      <NavBar/>
      <p>{title}</p>
      <img src={image[0]} height={image[1]} width={image[2]}/>
      <button onClick={()=> imageGen()}>hi</button>
    </div>
  );
}

export default App;

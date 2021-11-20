import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../src/components/NavBar/NavBar";
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';



function App() {
  
  const [comments, setComments] = useState([]);
  
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
    return await axios.get(`https://www.googleapis.com/youtube/v3/search?q=dog&key=AIzaSyDtnkhRWfuvM8GAG9ftSorGyYAieYyRjCo&maxResults=10&order=viewCount&part=snippet`)
    .then(res=> setCounter([res.data.items[0].snippet.thumbnails.default.url, res.data.items[0].snippet.thumbnails.default.height, res.data.items[0].snippet.thumbnails.default.width]));
  }
  
  useEffect(()=> console.log(counter),[]);

  // useEffect(()=> getAllComments(),[counter]);

  return (
    <div>
      <NavBar/>
      <p></p>
      <img src={counter[0]} height={counter[1]} width={counter[2]}/>
      <button onClick={()=> getTitleName()}>hi</button>
    </div>
  );
}

export default App;

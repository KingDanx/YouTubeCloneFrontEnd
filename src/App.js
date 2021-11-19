import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  
  const [comments, setComments] = useState([]);
  
  const [counter, setCounter] = useState(0);



  const getAllComments = async()=>{
    await axios.get("http://localhost:5000/api/comments/")
    .then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  }

  useEffect(()=> getAllComments(),[counter]);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={()=> setCounter(counter+1)}>hi</button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../../useForm';
import "../Comments/Comments.css";

const CommentForm = ({videoId, getAllComments}) => {
    
    const {formValue, handleChange, handleSubmit} = useForm(postComment);

    async function postComment(){
        await axios.post(`http://localhost:5000/api/comments/`, {
            videoID: videoId,
            text: formValue
        })
        .then((res) => {
          console.log(res.data);
          getAllComments();
        });
      }

    return ( 
        <form onSubmit={(event)=>handleSubmit(event)}>
            <input name="text" value={formValue} onChange={handleChange} type="text" />
            <input type="submit" />
        </form>
     );
}
 
export default CommentForm;
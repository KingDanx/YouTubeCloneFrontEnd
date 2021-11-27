import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../../useForm';
import Button from '@mui/material/Button';
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
            <input className="comment-form" name="text" placeholder="Add a public comment..." value={formValue} onChange={handleChange} type="text" />
            <div className="comment-form-button">
                <Button type="submit" variant="outlined"><b>Comment</b></Button>
            </div>
            
        </form>
     );
}
 
export default CommentForm;
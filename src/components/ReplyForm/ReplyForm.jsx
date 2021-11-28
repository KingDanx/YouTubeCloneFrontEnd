import React, { useState, useEffect } from 'react';
import useForm from '../../useForm';
import axios from 'axios';
import Button from "@mui/material/Button";

const ReplyForm = ({commentId, getAllComments, setExpanded}) => {
    
    const {
        formValue,
        handleChange,
        handleSubmit,       
      } = useForm(postReply);
          
      async function postReply() {
        await axios
          .post(
            `http://localhost:5000/api/comments/${commentId}/replies`, {
                text: formValue,
            }
          )
          .then((res) => {
            console.log(res.data);
            getAllComments();
            setExpanded(false);
          });
      }
    
    return ( 
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                        <input
                          className="comment-form"
                          name="text"
                          placeholder="Add a public reply..."
                          value={formValue}
                          onChange={(event) => handleChange(event)}
                          type="text"
                        />
                        <div className="comment-form-button">
                          <Button type="submit" variant="outlined">
                            <b>Reply</b>
                          </Button>
                        </div>
                      </form>
        </div>
     );
}
 
export default ReplyForm;
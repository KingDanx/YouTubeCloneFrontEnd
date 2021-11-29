import React, { useState, useEffect } from 'react';
import useForm from '../../useForm';
import axios from 'axios';
import Button from "@mui/material/Button";

const ReplyForm = ({formValue, handleSubmit, handleChange, commentId}) => {    
    return ( 
        <div>
            <form onSubmit={(event) => handleSubmit(event, commentId)}>
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
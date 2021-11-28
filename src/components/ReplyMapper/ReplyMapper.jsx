import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const ReplyMapper = ({replies, commentId, getAllComments}) => {

    const addReplyLike = async(reply) => {
        await axios.put(`http://localhost:5000/api/comments/${commentId}/replies/${reply._id}`, {
                text: reply.text,
                likes: reply.likes + 1,
                dislikes: reply.dislikes
            })
            .then((res) => {
              getAllComments();
              console.log(res.data.replies);
            });
      }
      const addReplyDislike = async(reply) => {
        await axios.put(`http://localhost:5000/api/comments/${commentId}/replies/${reply._id}`, {
                text: reply.text,
                likes: reply.likes,
                dislikes: reply.dislikes + 1
            })
            .then((res) => {
              getAllComments();
              console.log(res.data.replies);
            });
      }
    
    return ( 
        <div>
            <div>
                {replies
                  .slice(0)
                  .reverse()
                  .map((reply, index) => (
                    <div key={index} className="reply-text">
                      <div className="comment-like-dislike-div ">
                        <div>{reply.text}</div>
                        <div>
                          <div className="comments-button-right">
                            <span className="comments-dislikes-span">
                              {reply.dislikes}
                            </span>
                            <ThumbDownOffAltIcon
                              className="comments-likes-button"
                              onClick={() => addReplyDislike(reply)}
                            />
                          </div>
                          <div className="comments-button-right">
                            <span className="comments-likes-span">
                              {reply.likes}
                            </span>
                            <ThumbUpOffAltIcon
                              className="comments-likes-button"
                              onClick={() => addReplyLike(reply)}
                            />
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  ))}
              </div>
        </div>
     );
}
 
export default ReplyMapper;
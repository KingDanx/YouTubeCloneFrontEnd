import React, { useState, useEffect } from "react";
import axios from "axios";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Button from "@mui/material/Button";
import useForm from "../../useForm";

function Comments({
  comments,
  videoId,
  addLike,
  addDislike,
  getAllComments,
  addReplyDislike,
  addReplyLike,
}) {
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const { formValue, handleChange, handleSubmit, handleReplyChange } = useForm(postReply);

  async function postReply(comment) {
    await axios
      .post(`http://localhost:5000/api/comments/${comment._id}/replies`, {
        text: formValue,
      })
      .then((res) => {
        console.log(res.data);
        getAllComments();
      });
  }

  return (
    <div>
      {comments
        .slice(0)
        .reverse()
        .filter((commentss, index) => videoId === commentss.videoID)
        .map((comment, index) =>
          videoId === comment.videoID ? (
            <div
              key={index}
              className={
                index % 2 === 0 ? "commnets-map-div-alt" : "commnets-map-div"
              }
            >
              <div className="comment-like-dislike-div ">
                <div>{comment.text}</div>
                <div>
                  <div onClick={() => addDislike(comment)} className="comments-button-right">
                    <span className="comments-dislikes-span">
                      {comment.dislikes}
                    </span>
                    <ThumbDownOffAltIcon
                      className="comments-likes-button"
                    />
                  </div>
                  <div onClick={() => addLike(comment)} className="comments-button-right">
                    <span className="comments-likes-span">{comment.likes}</span>
                    <ThumbUpOffAltIcon
                      className="comments-likes-button"
                    />
                  </div>
                </div>{" "}
              </div>
              <div>
                <form onSubmit={(event) => handleSubmit(event, comment)}>
                  <input
                    className="comment-form"
                    name={comment._id}
                    placeholder="Add a public reply..."
                    value={formValue}
                    onChange={handleChange}
                    type="text"
                  />
                  <div className="comment-form-button">
                    <Button type="submit" variant="outlined">
                      <b>Reply</b>
                    </Button>
                  </div>
                </form>
              </div>
              <div>
                {comment.replies.map((reply, index) => (
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
                            onClick={() => addReplyDislike(comment, reply)}
                          />
                        </div>
                        <div className="comments-button-right">
                          <span className="comments-likes-span">
                            {reply.likes}
                          </span>
                          <ThumbUpOffAltIcon
                            className="comments-likes-button"
                            onClick={() => addReplyLike(comment, reply)}
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
    </div>
  );
}

export default Comments;

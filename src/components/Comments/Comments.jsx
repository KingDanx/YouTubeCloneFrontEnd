import React, { useState, useEffect } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function Comments({ comments, videoId, addLike, addDislike }) {
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div>
      {comments
        .slice(0)
        .reverse()
        .filter((commentss, index) =>
        videoId === commentss.videoID)
        .map((comment, index) =>
          videoId === comment.videoID ? (
            <div key={index} className={index % 2 === 0 ? "commnets-map-div-alt" : "commnets-map-div"}>
              <span>{comment.text} </span>
              <div className="comments-button-right">
                <span className="comments-dislikes-span">
                  {comment.dislikes}
                </span>
                <ThumbDownOffAltIcon 
                className="comments-likes-button"
                onClick={() => addDislike(comment)} 
                />
              </div>
              <div className="comments-button-right">
                <span className="comments-likes-span">{comment.likes}</span>
                <ThumbUpOffAltIcon
                  className="comments-likes-button"
                  onClick={() => addLike(comment)}
                />
                </div>
            </div>
          ) : null
        )}
    </div>
  );
}

export default Comments;

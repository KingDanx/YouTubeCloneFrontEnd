import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

function Comments({comments, videoId}){

    // useEffect(() => {
    //     console.log(comments)
    // }, [comments]);

    return(
       <div>
           {comments.slice(0).reverse().map((comment, index) => videoId === comment.videoID ? <p key={index}>{comment.text}</p> : null)}
       </div>
        
    );
}

export default Comments;
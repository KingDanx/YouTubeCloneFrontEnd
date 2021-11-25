import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

function Comments({comments, videoId, addLike, addDislike}){
    useEffect(() => {
        console.log(comments)
    }, [comments]);
    
    return(
       <div>
           {comments.slice(0).reverse().map((comment, index) => videoId === comment.videoID ? <div key={index}>
               {comment.text}
               <button  onClick={()=>addLike(comment)}>{comment.likes} Like</button>
               <button  onClick={()=>addDislike(comment)}>{comment.dislikes} Dislike</button>
               </div>  : null)}
       </div>
        
    );
}

export default Comments;
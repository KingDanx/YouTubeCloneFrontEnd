import React, { useState, useEffect } from 'react';

function Comments({comments, videoId, addLike, addDislike}){
        
    useEffect(() => {
        console.log(comments)
    }, [comments]);
    
    return(
       <div>
           {comments.slice(0).reverse().map((comment, index) => videoId === comment.videoID ? <div className="commnets-map-div" key={index}>
               <span>{comment.text} </span>
               <div className="comments-button-right">
                    <span className="comments-dislikes-span">{comment.dislikes}</span><button onClick={()=>addDislike(comment)}>Dislike</button>
               </div>
               <div className="comments-button-right">
                    <span className="comments-likes-span">{comment.likes}</span><button className="comments-likes-button" onClick={()=>addLike(comment)}>Like</button>    
               </div> 
               </div>  : null)}
       </div>
        
    );
}

export default Comments;
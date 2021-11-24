import React, { useState, useEffect } from 'react';

function SearchResults({results, setVideoId}) {
    return(
        <div>
            {results.map((vid, i) => <div style={{cursor: "pointer"}} onClick={()=>setVideoId(vid.id.videoId)}>
                <p key={i}>{vid.snippet.title}</p>
                <img key ={i} src={vid.snippet.thumbnails.medium.url}/> 
                </div>)}
        </div>
    )
} 

export default SearchResults;
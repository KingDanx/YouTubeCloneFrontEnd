import React, { useState, useEffect } from 'react';

function SearchResults({results, setVideoId}) {
    return(
        <div>
            {results.map((vid, i) => <div key={i} style={{cursor: "pointer"}} onClick={()=>setVideoId(vid.id.videoId)}>
                <p >{vid.snippet.title}</p>
                <img src={vid.snippet.thumbnails.medium.url}/> 
                </div>)}
        </div>
    )
} 

export default SearchResults;
import React, { useState, useEffect } from "react";
import "../../App.css";

const RelatedVideos = ({ related, setVideoId, setAutoPlay, getRelatedVideos, videoId, setTitle, multiSet}) => {
  
    const handelSubmit = (event, vid) => {
    event.preventDefault();
    setVideoId(vid.id.videoId);
    setAutoPlay(1);
  };

  useEffect(() => {
    getRelatedVideos();
  }, [videoId]);
  

  return (
    <div>
      {related.map((vid, i) =>
        !vid.snippet ? null : vid.id.videoId === videoId ? multiSet(vid) : (
          <div
            key={i}
            onClick={(event) => handelSubmit(event, vid)}
            className="App-related-video-center"
          >
            <p className="App-related-video-title">{vid.snippet.title}</p>
            <img src={vid.snippet.thumbnails.medium.url} />
          </div>
        )
      )}
    </div>
  );
};

export default RelatedVideos;

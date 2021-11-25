import React, { useState, useEffect } from "react";

const RelatedVideos = ({ related, setVideoId, setAutoPlay, getRelatedVideos, videoId, setTitle, title}) => {
  
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
        !vid.snippet ? null : vid.id.videoId === videoId ? setTitle(vid.snippet.title) : (
          <div
            key={i}
            style={{ cursor: "pointer" }}
            onClick={(event) => handelSubmit(event, vid)}
          >
            <p>{vid.snippet.title}</p>
            <img src={vid.snippet.thumbnails.medium.url} />
          </div>
        )
      )}
    </div>
  );
};

export default RelatedVideos;

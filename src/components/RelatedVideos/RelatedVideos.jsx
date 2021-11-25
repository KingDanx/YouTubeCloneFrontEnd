import React, { useState, useEffect } from "react";

const RelatedVideos = ({ related, setVideoId, setAutoPlay, getRelatedVideos, videoId }) => {
  
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
        !vid.snippet ? null : (
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

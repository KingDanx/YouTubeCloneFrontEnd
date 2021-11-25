import React, { useState, useEffect } from "react";

function SearchResults({ results, setVideoId, setAutoPlay, getRelatedVideos, videoId }) {
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
      {results.map((vid, i) => (
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={(event) => handelSubmit(event, vid)}
        >
          <p>{vid.snippet.title}</p>
          <img src={vid.snippet.thumbnails.medium.url} />
        </div>
      ))}
    </div>
  );
}

export default SearchResults;

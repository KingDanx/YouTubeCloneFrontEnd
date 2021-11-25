import React, { useState, useEffect } from "react";
import "./VideoPlayer.css";

function VideoPlayer({ videoId, autoPlay}) {

  return (
    <div className="container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay}&mute=1`}
        className="responsive-iframe"
        />
    </div>
  );
}

export default VideoPlayer;

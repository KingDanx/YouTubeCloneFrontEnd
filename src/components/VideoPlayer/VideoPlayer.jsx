import React, { useState, useEffect } from "react";
import "./VideoPlayer.css";

function VideoPlayer({ videoId, autoPlay, setAutoPlay}) {

  return (
    <div className="container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay}&mute=0`}
        className="responsive-iframe"
        />
    </div>
  );
}

export default VideoPlayer;

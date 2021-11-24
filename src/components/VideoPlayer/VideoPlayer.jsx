import React, { useState, useEffect } from "react";

function VideoPlayer({ videoId, autoPlay}) {

  return (
    <div>
      <iframe
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay}&mute=1`}
        frameborder="0"/>
    </div>
  );
}

export default VideoPlayer;

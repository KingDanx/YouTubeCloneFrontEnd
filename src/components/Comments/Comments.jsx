import React, { useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyMapper from "../ReplyMapper/ReplyMapper";
import ReplyForm from "../ReplyForm/ReplyForm";

function Comments({
  comments,
  videoId,
  addLike,
  addDislike,
  getAllComments,
  addReplyDislike,
  addReplyLike,
}) {
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
  return (
    <div>
      {comments
        .slice(0)
        .reverse()
        .filter((commentss, index) => videoId === commentss.videoID)
        .map((comment, index) =>
          videoId === comment.videoID ? (
            <div
              key={index}
              className={
                index % 2 === 0 ? "commnets-map-div-alt" : "commnets-map-div"
              }
            >
              <div className="comment-like-dislike-div ">
                <div>{comment.text}</div>
                <div>
                  <div
                    onClick={() => addDislike(comment)}
                    className="comments-button-right"
                  >
                    <span className="comments-dislikes-span">
                      {comment.dislikes}
                    </span>
                    <ThumbDownOffAltIcon className="comments-likes-button" />
                  </div>
                  <div
                    onClick={() => addLike(comment)}
                    className="comments-button-right"
                  >
                    <span className="comments-likes-span">{comment.likes}</span>
                    <ThumbUpOffAltIcon className="comments-likes-button" />
                  </div>
                </div>{" "}
              </div>
              <Accordion expanded={expanded === 'panel1'+index} onChange={handleAccordionChange('panel1'+index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Add a public reply...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                      <ReplyForm commentId={comment._id} getAllComments={getAllComments} handleAccordionChange={handleAccordionChange} setExpanded={setExpanded}/>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <ReplyMapper replies={comment.replies} commentId={comment._id} getAllComments={getAllComments}/>
            </div>
          ) : null
        )}
    </div>
  );
}

export default Comments;

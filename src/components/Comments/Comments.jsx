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
import useForm from "../../useForm";
import axios from "axios";

function Comments({
  comments,
  videoId,
  addLike,
  addDislike,
  getAllComments,
}) {

  const {
    formValue,
    handleChange,
    handleSubmit,       
    setFormValue,       
  } = useForm(postReply);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const [expanded, setExpanded] = useState(true);

  async function postReply(comment) {
    await axios
      .post(
        `http://localhost:5000/api/comments/${comment}/replies`, {
            text: formValue,
        }
      )
      .then((res) => {
        console.log(res.data);
        getAllComments();
        setExpanded(false);
      });
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      console.log(formValue);
      setFormValue("");
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
                      <ReplyForm formValue={formValue} handleSubmit={handleSubmit} handleChange={handleChange} postReply={postReply} commentId={comment._id} getAllComments={getAllComments} setExpanded={setExpanded}/>
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

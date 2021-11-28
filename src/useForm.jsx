import { useState } from "react";

const useForm = (callback) => {
    const [formValue, setFormValue] = useState("");
    const [replyValue, setReplyValue] = useState({});
    const [expanded, setExpanded] = useState(true);

    const handleChange = (event) => {
        event.persist(); 
        setFormValue(event.target.value);
    };

    const handleReplyChange = (event) => {
        event.persist(); 
        setReplyValue({
           [event.target.name] : event.target.value
        });
    } 

    const handleSubmit = (event, commentId = null) => {
        event.preventDefault();
        callback(commentId);
        setExpanded(false);
        setFormValue("");
        setReplyValue({
            text: "",
        })
    };

    return {formValue, replyValue, handleChange, handleSubmit, handleReplyChange, setExpanded, expanded, setReplyValue}
};
 
export default useForm;
import { useState } from "react";

const useForm = (callback) => {
    const [formValue, setFormValue] = useState("");


    const handleChange = (event) => {
        event.persist(); 
        setFormValue(event.target.value);
    };

    const handleReplyChange = (event) => {
        event.persist(); 
        setFormValue({formValue, [event.target.name]: event.target.value});
    } 

    const handleSubmit = (event, commentId = null) => {
        event.preventDefault();
        callback(commentId);
        setFormValue("");
    };

    return {formValue, handleChange, handleSubmit, handleReplyChange}
};
 
export default useForm;
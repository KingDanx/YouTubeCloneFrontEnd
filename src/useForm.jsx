import { useState } from "react";

const useForm = (callback) => {
    const [formValue, setFormValue] = useState("");

    const handleChange = (event) => {
        event.persist(); 
        setFormValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        callback();
        setFormValue("");
    };

    return {formValue, handleChange, handleSubmit}
};
 
export default useForm;
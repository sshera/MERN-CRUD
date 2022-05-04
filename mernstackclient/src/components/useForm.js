import React, {useEffect, useState} from "react";

const useForm = (initialFieldValues) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [currentId, setCurrentId] = useState(0);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        setErrors({});
        setCurrentId(0);
    }

    return ( {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } );
}
 
export default useForm;
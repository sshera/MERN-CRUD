import { Button, TextField, withStyles } from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "./useForm.js";
import { connect } from "react-redux";
import * as actions from '../actions/postMessage.js';
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@mui/icons-material";

const initialFieldValues = {
    title: '',
    message: ''
}

/* const styles = (theme) => ({
    root: {
        '&. MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200
        }
    },

    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },

    postBtn: {
        width: "50%"
    }
}); */

const PostMessageForm = (props) => {
    useEffect(() => {
        if(props.currentId !== 0) {
            setValues({
                ...props.postMessageList.find(x => x._id === props.currentId)
            });
            setErrors({});
        }
    }, [props.currentId]);

    const validate = () => {
        let temp = {...errors};
        temp.title = values.title ? "" : "This field is required";
        temp.message = values.message ? "" : "This field is required";
        setErrors = ({
            ...temp
        });
        return Object.values(temp).every(x => x=="");
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues.props.setCurrentId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => {
            window.alert('Submitted successfully!');
           /*  ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box" content="Submitted succesfully!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE} icon={<AssignmentTurnedIn/>} />
            }); */
        }
        if(validate()) {
            if(props.currentId === 0) {
                props.createPostMessage(values, onSuccess);
            } else {
                props.updatePostMessage(props.currentId, values, onSuccess);
            }
        }
        resetForm();
    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit} /* className={`${classes.root} ${classes.form}`} */>
            <TextField name="title" variant="outlined" label="Title" fullWidth
                value={values.title} onChange={handleInputChange}
                {...(errors.title && {error: true, helperText: errors.title})} />
            <br/><br/>
            <TextField name="message" variant="outlined" label="Message" fullWidth
                multiline rows={4} value={values.message} onChange={handleInputChange} 
                {...(errors.message && {error: true, helperText: errors.message})} />
            <br/><br/>
            <div align="center"><Button variant="contained" color="primary" size="large" type="submit" /* className={classes.postBtn}*/>
                Submit
            </Button></div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    postMessageList: state.postMessage.list
});

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}
 
export default /* withStyles(styles) */ connect(mapStateToProps, mapActionToProps)(PostMessageForm);

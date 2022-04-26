import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage.js";
import { Divider, Grid, List, ListItem, ListItemText, Paper, Typography, Button, withStyles } from "@mui/material";
import PostMessageForm from "./PostMessageForm.js";

/* const styles = (theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },

    smMargin: {
        margin: theme.spacing(1)
    },

    actionDiv: {
        textAlign: center
    }
}); */

//theme.spacing(1) = 8px, spacing(2) = 16, etc

//to access: props.classes.paper
// or const {classes, ...props} = props

/* const [x, setX] = useState(0);
    setX(5);

    useEffect(() => {

    }, [x]); */
    // if you pass in an empty array it is akin to componentDidMount
    // therefore what you pass in as a function will be invoked when the component mounts

const PostMessages = (props) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllPostMessages();
    }, []);

    const onDelete = (id) => {
        const onSuccess = () => {
            window.alert('Deleted successfully!');
        }
        if(window.confirm('Are you sure you want to delete this record?')) {
            props.deletePostMessage(id, onSuccess);
        }
    }

    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper /* className={classes.paper} */>
                    <PostMessageForm {...{currentId, setCurrentId}} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper /* className={classes.paper} */>
                    <List>
                        {
                            props.postMessageList.map((record, index) => {
                                return(
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    {record.title}
                                                </Typography>
                                                <div>
                                                    {record.message}
                                                </div>
                                                <div align="center" /* className="actionDiv"*/>
                                                    <Button variant="contained"
                                                    color="secondary"
                                                    size="small" onClick={() => setCurrentId(record._id)} /* className="smMargin"*/>Edit</Button>&nbsp; &nbsp;
                                                    <Button variant="contained"
                                                    color="warning"
                                                    size="small" onClick={() => onDelete(record._id)} /* className="smMargin" */>Delete</Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </React.Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    postMessageList: state.postMessage.list
});
// function is just returning an object so can use ({})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.Delete
}
// to access: props.fetchAllPostMessages
 
export default connect(mapStateToProps, mapActionToProps)/* (withStyles(styles) */(PostMessages)/* ) */;
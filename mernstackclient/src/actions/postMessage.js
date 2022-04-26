import api from "./api.js";

// before redux-thunk:

/* const fetchAll = {
    type: 'FETCH-ALL',
    payload: []
} */

//dispatch(fetchAll);

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

/* export const fetchAll = () => {
    return ((dispatch) => {

    });
} */

// when a function returns another function:

export const fetchAll = () => (dispatch) => {
    api.postMessage().fetchAll().then((res) => {
        // console.log(res);
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err);
    });
}

export const create = (data, onSuccess) => (dispatch) => {
    api.postMessage().create(data).then((res) => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        });
        onSuccess();
    }).catch((err) => {
        console.log(err);
    });
}

export const update = (id, data, onSuccess) => (dispatch) => {
    api.postMessage().update(id, data).then((res) => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: res.data
        });
        onSuccess();
    }).catch((err) => {
        console.log(err);
    });
}

export const Delete = (id, onSuccess) => (dispatch) => {
    api.postMessage().delete(id).then((res) =>{
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        });
        onSuccess();
    }).catch((err) => {
        console.log(err);
    });
}
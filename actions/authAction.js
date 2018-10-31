import {
    AUTH_URL,
} from '../config/urls';

export function loginInit() {
    return {
        type: 'LOGIN_INIT',
    };
}

export function loginRequest(email, password) {
    return {
        type: 'LOGIN_REQUEST',
        payload: { email, password },
    };
}

export function loginSuccess(email, response) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: { email, response },
    };
}

export function loginFailure(email, message) {
    return {
        type: 'LOGIN_FAILURE',
        payload: { email, message },
    };
}

export function logout() {
    return {
        type: 'LOGOUT_REQUEST',
    };
}

export function loginFetch(email, password) {
    return (dispatch) => {
        dispatch(loginRequest(email, password));
        return fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password,
                scope: '',
            }),
        })
        .then(response => response.json())
        .then((json) => {
            if (Object.prototype.hasOwnProperty.call(json, 'error')) {
                dispatch(loginFailure(email, json.error));
            } else {
                dispatch(loginSuccess(email, json));
            }
        })
        .catch((error) => {
            dispatch(loginFailure(email, error));
        });

    };
}

export function signInInit() {
    return {
        type: 'SIGNIN_INIT',
    };
}

export function signInRequest(username, email, password, response = '') {
    return {
        type: 'SIGNIN-REQUEST',
        payload: {
            username, email, password, response,
        },
    };
}

export function signInSuccess(username, email, password, response) {
    return {
        type: 'SIGNIN_SUCCESS',
        payload: {
            username, email, password, response,
        },
    };
}

export function signInFailure(username, email, response) {
    return {
        type: 'SIGNIN_FAILURE',
        payload: { username, email, response },
    };
}

export function signInFetch(username, email, password) {
    return (dispatch) => {
        dispatch(signInRequest(username, email, password));
        return fetch(USER_REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then((json) => {
                if (Object.prototype.hasOwnProperty.call(json, 'error')) {
                    dispatch(signInFailure(username, email, json.error));
                } else {
                    dispatch(signInSuccess(username, email, password, json.data));
                }
            })
            .catch((error) => {
                dispatch(signInFailure(username, email, error));
            });
    };
}

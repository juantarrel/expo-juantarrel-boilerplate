import { fromJS } from 'immutable';

const INIT_STATE = {
    id: -1,
    username: '',
    email: '',
    password: '',
    access_token: '',
    refresh_token: '',
    expires: null,
    loading: false,
    error: false,
    data: '',
    message: '',
    loggedIn: false,
};

const auth = (state = fromJS(INIT_STATE), action) => {
    switch (action.type) {
        case 'FORGOT_PASSWORD_INIT':
            return state.merge(INIT_STATE);
        case 'FORGOT_PASSWORD_SUCCESS':
            return state.merge({
                error: false,
                message: action.payload.response,
                email: action.payload.email,
            });
        case 'FORGOT_PASSWORD_FAILURE':
            return state.merge({
                error: true,
                message: action.payload.response,
            });
        case 'FORGOT_PASSWORD_END':
            return state.merge({
                loading: true,
                error: false,
                message: '',
            });
        case 'SIGNIN_INIT':
            return state.merge(INIT_STATE);
        case 'SIGNIN-REQUEST':
            return state.merge({
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                created_at: action.payload.created_at,
                updated_at: action.payload.updated_at,
                loading: true,
                error: false,
                data: '',
                message: action.payload.response,
            });
        case 'SIGNIN_SUCCESS':
            return state.merge({
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                created_at: action.payload.created_at,
                updated_at: action.payload.updated_at,
                loading: true,
                error: false,
                message: action.payload.response,
            });
        case 'SIGNIN_FAILURE':
            return state.merge({
                error: true,
                message: action.payload.response,
            });
        case 'LOGIN_INIT':
            return state.merge(INIT_STATE);
        case 'LOGOUT_REQUEST':
            return state.merge(INIT_STATE);
        case 'LOGIN_REQUEST':
            return state.merge({
                email: action.payload.email,
                password: action.payload.password,
                created_at: action.payload.created_at,
                updated_at: action.payload.updated_at,
                loading: true,
                error: false,
                message: '',
            });
        case 'LOGIN_SUCCESS':
            return state.merge({
                access_token: action.payload.response.access_token,
                refresh_token: action.payload.response.refresh_token,
                expires: action.payload.response.expires,
                password: '',
                loading: false,
                error: false,
                loggedIn: true,
            });
        case 'LOGIN_FAILURE':
            return state.merge(INIT_STATE).merge({
                error: true,
                message: action.payload.message,
            });

        case 'RESEND_VERIFY_FAILURE':
            return state.merge({
                error: true,
                message: action.payload.response,
            });
        case 'RESEND_VERIFY_SUCCESS':
            return state.merge({
                error: false,
                message: action.payload.response,
            });

        default:
            return state;
    }
};

export default auth;

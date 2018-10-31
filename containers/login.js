import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../screens/Login';
import { loginFetch, loginInit } from '../actions/authAction';

const mapStateToProps = state => ({ auth: state.auth.toJS() });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            loginFetch,
            loginInit,
        }, dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

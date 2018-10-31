import React from 'react';
import {
    StyleSheet,
    View, KeyboardAvoidingView, Text, TextInput, TouchableHighlight, Button
}
    from 'react-native';
import PropTypes from 'prop-types';

import unit from '../utils/dimensions';
import {loginFetch} from "../actions/authAction";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textPassword: '',
            textEmail: '',
            message: {
                username: '',
                password: '',
                general: '',
            },
            firstMount: 0,
            error: true,
            login: {
                style: styles.loginButtonDisabled,
                disabled: true,
            },
        };

        this.loginInit = this.loginInit.bind(this);
    }

    loginInit() {
        this.props.loginInit();
    }

    static getDerivedStateFromProps(props, currentState) {
        let { firstMount } = currentState;
        let msgUsername = '';
        let msgPassword = '';
        let msgGeneral = '';

        if (firstMount === 0) {
            props.loginInit();
        }

        if (typeof props.auth.message === 'string') {
            msgGeneral = props.auth.message;
            msgGeneral = msgGeneral.replace('.', '');
        }

        if (typeof props.auth.message === 'object') {
            msgUsername = props.auth.message.username !== undefined ? `${props.auth.message.username}\n` : '';
            msgPassword = props.auth.message.password !== undefined ? `${props.auth.message.password}\n` : '';
        }

        if (firstMount !== 0 && currentState.message !== props.auth.message) {
            if (props.auth.access_token !== '') {
                // props.navigation.navigate('Main');
            }

            firstMount = 1;
            return {
                message: {
                    username: msgUsername,
                    password: msgPassword,
                    general: msgGeneral,
                },
                firstMount,
                error: props.auth.error,
            };
        }
        return { firstMount: 1 };
    }

    render() {
        const { loginFetch } = this.props;



        let btnStyle = styles.loginButtonDisabled;
        let btnDisabled = true;

        if (this.state.textEmail !== '' && this.state.textPassword !== '') {
            btnStyle = styles.loginButtonEnabled;
            btnDisabled = false;
        }

        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                enabled
            >
                <View style={styles.title}>
                    <Text>
                        Hey Welcome!
                    </Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.formInput}
                        placeholder={'Username'}
                        onChangeText={ textEmail => this.setState({ textEmail }) }
                    />
                    <TextInput
                        style={styles.formInput}
                        placeholder={'Password'}
                        secureTextEntry
                        onChangeText={ textPassword => this.setState({ textPassword }) }
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={ () => loginFetch(this.state.textEmail, this.state.textPassword) }
                        title="Log In"
                        color="#0095f1"
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object,
    access_token: PropTypes.string,
    onLogin: PropTypes.func,
    text: PropTypes.string,
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
    },
    form: {
    },
    formInput: {
      width: 300,
    },
    button: {
    }
});

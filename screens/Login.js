import React from 'react';
import {
    StyleSheet,
    View, KeyboardAvoidingView, Text, TextInput, TouchableHighlight, Button
}
    from 'react-native';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textPassword: '',
            textEmail: ''
        };

        this.loginInit = this.loginInit.bind(this);
    }

    loginInit() {
        this.props.loginInit();
    }


    render() {
        const { loginFetch } = this.props;

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

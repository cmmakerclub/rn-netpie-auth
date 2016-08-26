/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {NETPIE} from 'react-native-netpie-auth'

class netpie_auth extends Component {

    constructor() {
        super();

        this.state = {
            msg: 'hello'
        }
    }

    componentDidMount() {
        // NETPIE.writeBackTest();
        DeviceEventEmitter.addListener("messageArrived", (args)=> {
            console.log("CALLBACK FIRED", args);
        });

        this.setState({msg: "Connecting to netpie.."});

        setTimeout(() => {
            NETPIE.config({
                appId: 'CMMC',
                appKey: '60qturoh80sRMXq',
                appSecret: 'ahKOgQWSE6h87Anc9QP5HJgdQ'
            }, (err, res) => {
                if (err) {
                    this.setState({msg: res});
                }
                else {
                    this.setState({msg: "NETPIE CONNECTED."});
                }
            });
        }, 10);
    }

    render() {
        // console.log("HELLO", NETPIE);
        // console.log(NETPIE.testReactMethod());
        return (
            <View style={styles.container}>
                <Text>{this.state.msg}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('netpie_auth', () => netpie_auth);

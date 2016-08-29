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

import {NETPIE} from 'react-native-netpie-mqtt-auth-generator'
var mqtt = require('react-native-mqtt');


class netpie_auth extends Component {

    constructor() {
        super();

        this.state = {
            msg: 'Connecting to netpie..',
            topic: ''
        }
    }

    componentDidMount() {

        DeviceEventEmitter.addListener("messageArrived", (args)=> {
            console.log("CALLBACK FIRED", args);
        });

        console.log("DID MOUNT");
        NETPIE.config({
            appId: 'CMMC',
            appKey: 'Cm6F9L3K2BIKxmw',
            appSecret: 'M1gMPPmDa4n4k8ghyeHltMOFT'
        }, (err, res) => {
            if (err) {
                this.setState({msg: res});
            }
            else {
                console.log(res);
                this.setState({msg: "NETPIE CONNECTED."});
                var that = this;
                // /* create mqtt client */
                let opts = {
                    uri: 'mqtt://gb.netpie.io:1883',
                    clientId: res.mqtt_clientid,
                    user: res.mqtt_username,
                    pass: res.mqtt_password,
                    auth: true,
                    clean: true,
                };

                mqtt.createClient(opts).then(function (client) {
                    client.on('closed', function () {
                        console.log('mqtt.event.closed');
                    });

                    client.on('error', function (msg) {
                        console.log('mqtt.event.error', msg);
                    });

                    client.on('message', function (msg) {
                        console.log('mqtt.event.message', msg);
                        that.setState({topic: msg.topic, msg: msg.data });
                    });

                    client.on('connect', function () {
                        console.log('connected');
                        client.subscribe('/CMMC/gearname/#', 0);
                    });

                    client.connect();

                }).catch(function (err) {
                    console.log(err);
                });

            }
        });
    }

    render() {
        // console.log("HELLO", NETPIE);
        // console.log(NETPIE.testReactMethod());
        return (
            <View style={styles.container}>
                <Text>{this.state.topic}</Text>
                <Text style={styles.big}>{this.state.msg}</Text>
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
    big: {
        fontSize: 40,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('netpie_auth', () => netpie_auth);

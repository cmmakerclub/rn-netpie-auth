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

var MicroGear = require("react-native-cmmc-microgear");

class netpie_auth extends Component {

    APPID = "CMMC";
    KEY = "Qiah96b7mdcmtvq";
    SECRET = "bt81P9VyTilLkdMJrN9c10Jph";

    constructor() {
        super();

        this.state = {
            msg: 'Connecting to netpie..',
            topic: ''
        };

        this.microgear = MicroGear.create({
            key: this.KEY,
            secret: this.SECRET
        });

        this.microgear.on('connected', () => {
            console.log('Connected...');
            this.microgear.subscribe("/CMMC/gearname/#");
            setInterval(() => {
                this.microgear.chat('mygear', 'Hello world.');
            }, 400);
        });

        this.microgear.on('message', (topic, body) => {
            console.log('incoming : ' + topic + ' : ' + body);
            this.setState({msg: body});
        });

        this.microgear.on('closed', () => {
            console.log('Closed...');
        });

        this.microgear.on("error", (reason) => {
            console.log("reason = ", reason);
            this.setState({msg: reason});
        });

    }

    componentDidMount() {
        this.microgear.connect(this.APPID);

        DeviceEventEmitter.addListener("messageArrived", (args)=> {
            console.log("CALLBACK FIRED", args);
        });

        console.log("DID MOUNT");
    }

    render() {
        // console.log("HELLO", NETPIE)
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

import React, { } from "react";
import {
    View,
    Text,
    Dimensions,
    PermissionsAndroid,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView,
    Image
} from "react-native";
import ScreenHOC from "../../Components/HOC/ScreenHOC";
import { useEffect } from "react";
import { useState } from "react";
import { AlertPrompt } from 'react-native-alert-prompt';
import { useDispatch } from "react-redux";
import * as AgoraActions from "../../Store/actions/agoraActions";
import RtmAdapter from "../Chat/rtm-adapter";

const { width, height } = Dimensions.get("window");

const callEnd = require("../../assets/images/btn_endcall.png");
const videoOn = require("../../assets/images/enable_camera.png");
const videoOff = require("../../assets/images/disable_camera.png");
const camera = require("../../assets/images/camera_swap.png");
const muteOn = require("../../assets/images/btn_mute.png");
const muteOff = require("../../assets/images/btn_mute_off.png");

const Dashboard = ({ navigation }) => {
    const client = new RtmAdapter();

    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        // agorainit();

        requestCameraAndAudioPermission();
    }, []);


    const requestCameraAndAudioPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])
            if (
                granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('You can use the cameras & mic')
            } else {
                console.log('Permission denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    return (
        <ScreenHOC showHeader={true} headerTitle="Dashboard">
            <View style={{
                padding: 20
            }}>
                <Text allowFontScaling={false} style={{
                    fontSize: 20,
                    fontWeight: "700"
                }}>Welcome!</Text>

            </View>

            <View
                style={{ marginTop: 40, alignItems: "center" }}>
    
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Chat")
                    }
                    style={{
                        backgroundColor: "black",
                        alignItems: "center",
                        padding: 10,
                        paddingHorizontal: 30,
                        borderRadius: 5,
                        marginTop: 15,
                        width: width - 30
                    }}
                    activeOpacity={.6}>
                    <Text allowFontScaling={false} style={{
                        fontSize: 17,
                        fontWeight: "700",
                        color: "#fff"
                    }}>Chat Room</Text>
                </TouchableOpacity>
            </View>
        </ScreenHOC>
    )
}



export default Dashboard;
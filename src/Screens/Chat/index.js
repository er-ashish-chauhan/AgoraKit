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
import { useDispatch } from "react-redux";
import {
    cred
} from "../../Shared/constants/credentials";
import { v4 as uuidv4 } from 'uuid';
import RtmAdapter from "./rtm-adapter";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");


const Chat = ({ navigation, route }) => {
    const client = new RtmAdapter();
    //manage states 
    const [appId, setAppId] = useState("74b7d8829add489abdba9834ba186740");
    const [channelName, setChannelName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        //login account
        agorainit(uuidv4());

        return () => {
            client.logout();
            client.destroy();
        }
    }, []);

    // Pass in your App ID through this.state, create and initialize an RtcEngine object.
    const agorainit = async (uuid) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://api.theclimatelink.com//agora/rtm/" + uuid + "/",
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );

            const responseJson = await response.json();

            console.log(JSON.stringify(responseJson, null, 1), "ress")

            setIsLoading(false);

            if (responseJson?.rtmToken) {
                cred.agora_app_token = responseJson.rtmToken;

                client.login(uuid, responseJson.rtmToken).then(() => {
                    console.log("login success")
                    setLoginSuccess(true);
                    // Alert.alert("Login", "Login success for chat room")
                });
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err, "init error");
            Alert.alert("Something went wrong. Please try later");
        }

    }

    //Join chat
    const joinChat = async () => {

        if (!loginSuccess) {
            Alert.alert("Error", "Please login first");
            return;
        }

        if (channelName.trim().length == 0) {
            Alert.alert("Error", "Please enter the channel name");
            return;
        }

        navigation.navigate("ChatRoom", { token: cred.agora_app_token, channel: channelName, uid: accountName });
    }

    return (
        <ScreenHOC
            showHeader={true} showBackIcon={true} navigation={navigation} headerTitle="Chat Room"
        >
            {isLoading && (
                <View style={{
                    position: "absolute",
                    top: height / 3,
                    alignSelf: "center",
                    alignItems: "center",
                    elevation: 6,
                    width: width / 2.2,
                    padding: 15,
                    borderRadius: 5,
                    zIndex: 999,
                    backgroundColor: "#fff"
                }}>
                    <ActivityIndicator size="small" color="#000" />
                    <Text style={{
                        textAlign: "center"
                    }}>Please wait!{'\n'}You're logging in!</Text>
                </View>
            )}

            <ScrollView
                style={{
                    paddingBottom: 50
                }}
                automaticallyAdjustContentInsets={true}
                showsVerticalScrollIndicator={false}>

                <View style={{
                    padding: 20
                }}>
                    <Text allowFontScaling={false} style={{
                        fontSize: 20,
                        fontWeight: "700"
                    }}>Join Chat Room!</Text>
                </View>

                <View
                    style={{ marginTop: 40, alignItems: "center" }}>
             
                    <View
                        style={{
                            borderWidth: 0.8,
                            width: width - 40,
                            marginBottom: 20,
                            padding: 10,
                            borderRadius: 5,
                            paddingVertical: 0
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "#000"
                            }}
                            placeholder="Enter Channel Name"
                            selectionColor="#000"
                            value={channelName}
                            onChangeText={text => setChannelName(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={joinChat}
                        style={{
                            backgroundColor: "black",
                            padding: 10,
                            paddingHorizontal: 30,
                            borderRadius: 5,
                            width: width - 30,
                            alignItems: "center"
                        }}
                        activeOpacity={.6}>
                        <Text allowFontScaling={false} style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: "#fff"
                        }}>Join Chat</Text>
                    </TouchableOpacity>
                    {loginSuccess && (
                        <TouchableOpacity
                            onPress={() => {
                                client.logout();
                                setLoginSuccess(false);
                                setAccountName("");
                                setChannelName("");
                            }}
                            style={{
                                backgroundColor: "black",
                                padding: 10,
                                paddingHorizontal: 30,
                                borderRadius: 5,
                                width: width - 30,
                                marginTop: 20,
                                alignItems: "center"
                            }}
                            activeOpacity={.6}>
                            <Text allowFontScaling={false} style={{
                                fontSize: 17,
                                fontWeight: "700",
                                color: "#fff"
                            }}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </ScreenHOC>
    )
}



export default Chat;
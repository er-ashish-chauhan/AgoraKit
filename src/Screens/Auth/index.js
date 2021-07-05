import React, { useRef } from "react";
import { View, SafeAreaView, Text, Dimensions, TouchableOpacity } from "react-native";
const { width, height } = Dimensions.get("window");
import LinkedInModal from 'react-native-linkedin';

const Auth = ({ navigation }) => {
    const linkedRef = useRef();

    const fetchDetails = async ({access_token}) => {
        try {
            const response = await fetch('https://api.linkedin.com/v2/me', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
            const payload = await response.json();
            console.log(payload, "payloadd");
            navigation.navigate("Dashboard");
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View style={{ alignItems: "center", alignContent: "center", height: "100%", marginVertical: height / 2.5 }}>
            <LinkedInModal
                ref={linkedRef}
                clientID="8613e6z8ra2rpf"
                clientSecret="ocFZFbe8eXtd4uAE"
                redirectUri="https://www.theclimatelink.com/login-success"
                onSuccess={token => {
                    console.log(token, "token")
                    fetchDetails(token);
                }}
                onSignIn={res => console.log(res, "result")}
                onError={err => console.log(err, "errors")}
                shouldGetAccessToken={true}
                renderButton={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // linkedRef?.current.open()
                                navigation.navigate("Dashboard");
                            }}
                            style={{
                                backgroundColor: "#1666c2",
                                padding: 10,
                                paddingHorizontal: 30,
                                borderRadius: 5
                            }}
                            activeOpacity={.6}>
                            <Text allowFontScaling={false}
                                style={{
                                    fontSize: 16,
                                    color: "#fff",
                                    fontWeight: "700"
                                }}>Login with Linkedin</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Auth;
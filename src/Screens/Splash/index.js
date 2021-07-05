import React, { useEffect} from "react";
import { View, SafeAreaView, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const SplashScreen = ({ navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Auth")
        }, 500);
    }, [])

    return (
        <View style={{ alignItems: "center", alignContent: "center", height: "100%", marginVertical: height / 2.5 }}>
            <Text allowFontScaling={false} style={{
                fontSize: 26, fontWeight: "700"
            }}>Splash Screen</Text>
            <Text style={{ fontSize: 18, marginTop: 20 }} allowFontScaling={false}>Please wait...</Text>
        </View>
    )
}

export default SplashScreen;
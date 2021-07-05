/**
 * App Header
 */
import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  BackHandler,
} from 'react-native';
import { Body, Container, Header, Icon, Left, Right, Title, Button } from 'native-base';
import { normalize } from '../../Shared/methods';
import { colors } from '../../Shared';


const hitSlop = { top: 10, left: 10, bottom: 10, right: 10 };
const CustomHeader = ({ showBellIcon,
  showBackIcon,
  onBackPress,
  onRightPress,
  navigation, title }) => {


  return (
    <Header style={styles.header}>
      <Left>
        {showBackIcon && (
          <TouchableOpacity
            hitSlop={hitSlop}
            activeOpacity={.6}
            onPress={onBackPress}>
            <Image source={require("../../assets/images/back_arrow.png")} style={{
              width: 25,
              height: 25
            }} />
          </TouchableOpacity>
        )}
      </Left>
      <Body style={{ flex: Platform.OS == "android" ? 8 : 3, alignSelf: "center" }}>
        <Title style={styles.pageTitle}>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};


export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    alignItems: "center",
    //  borderBottomColor: colors.lightGray,
    backgroundColor: colors.light,
    paddingLeft: 20,
    paddingRight: 10
  },
  icons: {
    width: normalize(30),
    height: normalize(25)
  },
  notiIcon: {
    width: normalize(27),
    height: normalize(27)
  },
  headerLogo: {
    width: normalize(94),
    height: normalize(46),
    marginBottom: normalize(10),
    marginRight: normalize(40),
  },
  pageTitle: {
    marginTop: 3,
    fontSize: normalize(20),
    color: colors.black,
    alignSelf: "center",
    // fontFamily: 'Roboto-Bold',
  },
  black_text: {
    color: colors.THEME_COLOR,
    paddingLeft: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: 5,
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: colors.secondary,
  },
});

import React from 'react';
import { AppContext, AppContextType } from '../components/context';
import { GiftedChat } from 'react-native-gifted-chat';
import { Logger } from './utils';
import RtmAdapter from './rtm-adapter';
import {
  BackHandler
} from "react-native";
import ScreenHOC from '../../Components/HOC/ScreenHOC';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.client = new RtmAdapter();
    this.state = {
      messages: [],
      channel: this.props.route.params?.channel,
      uid: this.props.route?.params?.uid,
      token: this.props.route?.params?.token
    };
  }


  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  subscribeChannelMessage() {
    this.client.on('error', (evt) => {
      Logger.log(evt);
    });

    this.client.on('channelMessageReceived', (evt) => {
      const { uid, channelId, text } = evt;
      console.log('evt', evt);
      Logger.log('channelMessageReceived uid ', uid);
      if (channelId === this.state.channel) {
        this.setState((prevState) => ({
          messages: GiftedChat.append(prevState.messages, [
            {
              _id: +new Date(),
              text,
              user: {
                _id: +new Date(),
                name: uid.substr(uid.length - 1, uid.length),
              },
              createdAt: new Date(),
            },
          ]),
        }));
        console.log('message from current channel', text);
      }
    });
  }

  onSend(messages = []) {
    const channel = this.state.channel;
    console.log('send channel', this.state.channel);
    messages.forEach((message) => {
      // this.client.sendChannelMessage

      this.client.sendChannelMessage({
        channel: this.state.channel,
        message: message.text,
      })
        .then(() => {
          console.log('send message');
          console.log("msggg", [message])
          this.setState((prevState) => ({
            messages: GiftedChat.append(prevState.messages, [message]),
          }));
        })
        .catch(() => {
          console.warn('send failured');
        });
    });
  }

  componentDidMount() {

    console.log(this.props, "navi")

    let channel = this.state.channel;
    console.log('mount chat ', channel);
    this.subscribeChannelMessage();
    this.client
      .join(channel)
      .then(() => {
        console.log('join channel success');
        this.setState({
          channel,
        });
      })
      .catch((_) => {
        console.warn('join failured');
      });
  }
  
  componentWillUnmount() {
    // let channel = this.props.navigation.getParam('channel', 'agora');
    this.client.leave(this.state.channel);
  }

  render() {

    return (
      <ScreenHOC
        showHeader={true} showBackIcon={true} navigation={this.props.navigation} headerTitle="Chat Room"
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
          }}
        />
      </ScreenHOC>
    );
  }
}

export default ChatRoom;
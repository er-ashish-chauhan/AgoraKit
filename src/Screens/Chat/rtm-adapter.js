import RtmEngine from 'agora-react-native-rtm';
import { EventEmitter } from 'events';
import { Logger } from './utils';
import {
  cred
} from "../../Shared/constants/credentials";
const config = require('../agora.config.json');

export default class RtmAdapter extends EventEmitter {


  constructor() {
    super();
    this.uid = null;
    this.client = new RtmEngine();
    const events = [
      'tokenExpired',
      'remoteInvitationRefused',
      'remoteInvitationFailure',
      'remoteInvitationCanceled',
      'remoteInvitationAccepted',
      'messageReceived',
      'localInvitationRefused',
      'localInvitationReceivedByPeer',
      'localInvitationFailure',
      'localInvitationCanceled',
      'localInvitationAccepted',
      'error',
      'connectionStateChanged',
      'channelMessageReceived',
      'channelMemberLeft',
      'channelMemberJoined',
      'remoteInvitationReceived',
    ];
    events.forEach((event) => {
      // @ts-ignore
      this.client.on(event, (evt) => {
        console.warn(event, evt);
        this.emit(event, evt);
      });
    });
  }

  login = async (uid, token) => {
    let clientRes = await this.client.createClient(cred.agora_AppID);
    console.log(clientRes, "client response")
    this.uid = uid;
    return this.client.login({
      // uid: "chatApp",
      uid: this.uid,
      token: token,
      // token: cred.agora_app_token,
    });
  }

  logout = async () => {
    await this.client.logout();
    Logger.log('logout success');
  }

  join = async (cid) => {
    return this.client.joinChannel(cid);
  }

  leave = async (cid) => {
    return this.client.leaveChannel(cid);
  }

  sendChannelMessage = async (param) => {
    console.log(param, "send messages param")
    return this.client.sendMessageByChannelId(param.channel, param.message);
  }

  destroy = async () => {
    await this.client.destroyClient();
    console.log('destroy');
  }
}
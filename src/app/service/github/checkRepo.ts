import Log, { LogUtils } from '../../utils/Log';
import https from 'https';
import axios from 'axios';


export async function getinfo(username) {
  await axios.get('https://api.github.com/repos/{username}/White-Rabbit')
    .then((res:any) => res.json())
    .then((result:any) => {
      return result.fork;
    }, (error) => {
      LogUtils.logError('No such repo or check the username', error);
    });
}


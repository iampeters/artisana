import API from '../API/Apis';
// import { TokenValidator } from './TokenValidator';
import { Tokens } from '../interfaces/interface';

export default class NotificationService {

  notify = API.notifications;
  tokens: any | Tokens

  constructor() {
    // this.tokens = TokenValidator();
  }

  async getNotifications(userId: string, tokens: Tokens) {
    
    try {
      let response = await fetch(this.notify + `getNotifications/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
      });

      return await response.json();
    } catch (err) {
      throw err;

    }
  }

  async markAsRead(data: string, tokens: Tokens) {
    try {
      let response = await fetch(this.notify + `markAsRead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}
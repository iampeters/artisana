import API from '../API/Apis';
import { Pagination, Tokens } from '../interfaces/interface';

export default class ChatService {

  chats = API.chats;
  
  constructor() {
    // this.tokens = TokenValidator();
  }

  async getActiveChats(data: Pagination, tokens: Tokens) {
    try {
      let response = await fetch(this.chats + `getActiveChats?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`, {
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

  async getChats(data: Pagination, userId: string, tokens: Tokens) {
    try {
      let response = await fetch(this.chats + `getChats/${userId}?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`, {
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

  async createChat(data: any, tokens: Tokens) {    
    try {
      let response = await fetch(this.chats + 'sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify(data),
      });      

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}
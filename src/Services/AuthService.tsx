import API from '../API/Apis';
import { TokenValidator } from './TokenValidator';
import { Tokens, User } from '../Interfaces/interface';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthService {

  token = API.identity + 'token';
  socialAuthentication = API.social + 'auth';
  create = API.users + 'create';
  users = API.users;
  identity = API.identity;
  authToken: Tokens | any;
  refresh_token = API.identity + 'refresh';

  constructor() {
    // this.authToken = TokenValidator();
    // this.authToken = AsyncStorage.getItem('token');
  }

  async login(data: any) {
    try {
      let response = await fetch(this.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async signUp(data: any) {
    try {
      let response = await fetch(this.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async socialAuth(data: any) {
    try {
      let response = await fetch(this.socialAuthentication, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async getUser(id: string, tokens: Tokens) {
    try {
      let response = await fetch(this.users + `${id}`, {
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

  async updateUser(data: User, tokens: Tokens) {
    try {
      let response = await fetch(this.users + `update/${data._id}`, {
        method: 'PUT',
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

  async forgotPassword(email: string) {
    try {
      let response = await fetch(this.identity + 'forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(data: any) {
    try {
      let response = await fetch(this.identity + 'resetPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async changePassword(data: any, token: Tokens) {
    try {
      let response = await fetch(this.identity + 'changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.auth_token}`
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async refreshToken(tokens: Tokens) {
    try {
      let response = await fetch(this.refresh_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.refresh_token}`
        },
        body: JSON.stringify({ auth_token: tokens.auth_token }),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}

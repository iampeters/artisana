import API from '../API/Apis';
import { Tokens } from '../interfaces/interface';

export default class FileService {

  config = API.configuration;
  tokens: any | Tokens
  constructor() {
    // this.tokens = TokenValidator();
  }

  async fileUpload(data: FormData, tokens: Tokens) {
    try {
      let response = await fetch(this.config + 'fileUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: data,
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }


  async getArtisanDashboard(tokens: Tokens) {
    try {
      let response = await fetch(this.config + 'artisan/dashboard', {
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

  async getUserDashboard(tokens: Tokens) {
    try {
      let response = await fetch(this.config + 'users/dashboard', {
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

}
import API from '../API/Apis';
import { Pagination, Artisans, Tokens } from '../interfaces/interface';
import { TokenValidator } from './TokenValidator';

export default class AuthService {

  tokens: any | Tokens;
  constructor() {
    // this.tokens = TokenValidator();

  }

  artisans = API.artisans;

  async createArtisan(data: Artisans, tokens: Tokens) {
    try {
      let response = await fetch(this.artisans + 'onboardArtisan', {
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

  async getArtisans(data: Pagination, tokens: Tokens) {
    try {
      let response = await fetch(
        this.artisans + `all/?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.auth_token}`
          }
        });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async getArtisanDetails(data: string, tokens: Tokens) {
    try {
      let response = await fetch(
        this.artisans + `${data}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.auth_token}`
          }
        });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async onboardArtisan(data: Artisans) {
    try {
      let response = await fetch(this.artisans + 'create', {
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

  async updateArtisan(data: Artisans, tokens: Tokens) {
    try {
      let response = await fetch(this.artisans + `update/${data._id}`, {
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

  async updateBusiness(data: Artisans, tokens: Tokens) {
    try {
      let response = await fetch(this.artisans + `update/businessInformation/${data._id}`, {
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

  async updateNextOfKin(data: Artisans, tokens: Tokens) {
    try {
      let response = await fetch(this.artisans + `update/nextOfKin/${data._id}`, {
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

  async verifyEmail(data: any) {
    try {
      let response = await fetch(this.artisans + 'verify-email', {
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

  async confirmEmail(data: any) {
    try {
      let response = await fetch(this.artisans + 'email-confirmation', {
        method: 'POST',
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




};
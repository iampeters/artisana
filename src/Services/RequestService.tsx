import API from '../API/Apis';
import { TokenValidator } from './TokenValidator';
import { Tokens, Pagination } from '../interfaces/interface';

export default class JobService {

  requests = API.requests;

  constructor() {
    // this.tokens = TokenValidator();
  }

  async getRequests(data: Pagination, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `all?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`, {
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

  async getRequestDetails(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `${id}`, {
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

  async assignRequest(data: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + 'create', {
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

  async cancelRequest(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `cancel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify({})
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async acceptRequest(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `accept/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify({})
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async rejectRequest(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `reject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify({})
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async timeoutRequest(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.requests + `timeout/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.auth_token}`
        },
        body: JSON.stringify({})
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}
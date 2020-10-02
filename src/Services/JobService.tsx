import API from '../API/Apis';
import { Tokens, Pagination } from '../interfaces/interface';

export default class JobService {

  jobs = API.jobs;

  constructor() {
    // this.tokens = TokenValidator();
  }

  async getJobs(data: Pagination, tokens: Tokens) {
    try {
      let response = await fetch(this.jobs + `all?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`, {
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

  async getJobDetails(id: any, tokens: Tokens) {
    try {
      let response = await fetch(this.jobs + `${id}`, {
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

  async createJob(data: any, tokens: Tokens) {
    try {
      let response = await fetch(this.jobs + 'create', {
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
  async completeJob(data: string, tokens: Tokens) {
    try {
      let response = await fetch(this.jobs + `complete/${data}`, {
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
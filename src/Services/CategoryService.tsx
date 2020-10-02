import API from '../API/Apis';
import { TokenValidator } from './TokenValidator';
import { Tokens, Pagination } from '../interfaces/interface';

export default class CategoryService {
  
  category = API.category;

  constructor() {
    // this.tokens = TokenValidator();
  }

  async getCategory(data: Pagination, tokens: Tokens) {
    try {
      let response = await fetch(
        this.category + `?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`,
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

}
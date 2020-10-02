import API from '../API/Apis';
import { Tokens } from '../interfaces/interface';
import { TokenValidator } from './TokenValidator';

export default class FileService {

  config = API.configuration + 'fileUpload';
  constructor() {
    // this.tokens = TokenValidator();
  }

  async fileUpload(data: FormData, tokens: Tokens) {
    try {
      let response = await fetch(this.config, {
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

}
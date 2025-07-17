const axios = require('axios');

class WordPressClient {
  constructor(baseUrl, token) {
    this.api = axios.create({
      baseURL: `${baseUrl}/wp-json/wp/v2`,
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  async getPosts() {
    try {
      const response = await this.api.get('/posts');
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async getComments() {
    try {
      const response = await this.api.get('/comments');
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async createComment(postId, content) {
    try {
      const response = await this.api.post('/comments', { post: postId, content });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    throw error;
  }
}

module.exports = { WordPressClient };

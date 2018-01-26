const axios = require("axios");
const { stringify } = require("query-string");
const BASE_URL = "https://tastedive.com/api/similar?";

module.exports = class TDAW {
  constructor({ apiKey }) {
    if (!apiKey) {
      throw new Error("Tastedive requires an api key!");
    }

    this.apiKey = apiKey;

    // Specific types for a query that are listed on tastedive's website
    TDAW.types = ["music", "movies", "shows", "books", "authors", "games"];
  }

  async search(query) {
    query.k = this.apiKey;

    const res = await axios.get(BASE_URL + stringify(query));

    if (query.callback) callback(res.data.Similar.Results);
    return res.data.Similar.Results;
  }

  checkType(type) {
    if (TDAW.types.indexOf(type) === -1) {
      throw new Error(`${type} isn't a valid type!`);
    }
  }

  checkInfoVal(val) {
    if (val !== 0 && val !== 1) {
      throw new Error("Value parameter must be either 0 or 1!");
    }
  }

  checkLimit(limit) {
    if (typeof limit !== "number") {
      throw new Error("Limit value must be a number!");
    }
  }

  checkCallback(func) {
    if (typeof func !== "function") {
      throw new Error("You must provide a valid callback function!");
    }
  }

  getRecommendations({ q, type, info, limit, callback, verbose }) {
    if (!q) throw new Error("You must provide something to search!");

    if (info) this.checkInfoVal(info);
    if (limit) this.checkLimit(limit);
    if (type) this.checkType(type);
    if (callback) this.checkCallback(callback);

    return this.search({
      q,
      type,
      info,
      limit,
      callback,
      verbose
    });
  }
};

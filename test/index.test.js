const { expect } = require("chai");
const TDAW = require("../index");
const { tastediveKey } = require("../apiKey");

describe("App", () => {
  let tdaw;

  before(() => {
    tdaw = new TDAW({
      apiKey: tastediveKey
    });
  });

  it("no api key should throw an error", () => {
    try {
      const tdawErr = new TDAW({});
    } catch (err) {
      expect(err.message).to.equal("Tastedive requires an api key!");
    }
  });

  it("basic query should be successful", async () => {
    const recs = await tdaw.getRecommendations({ q: "Ida" });
    return recs.forEach(movie => {
      expect(movie).to.have.keys("Name", "Type");
      expect(movie.Name).to.be.an("string");
      expect(movie.Type).to.be.a("string");
    });
  });

  it("full query should be successful", async () => {
    const recs = await tdaw.getRecommendations({
      q: "Ida",
      type: "movies",
      info: 1
    });
  });

  it("verbose query should have additional return values", async () => {
    const recs = await tdaw.getRecommendations({
      q: "Forrest Gump",
      limit: 20,
      info: 0,
      verbose: 1,
      val: 1
    });
    return recs.forEach(movie => {
      expect(movie).to.have.keys(
        "Name",
        "Type",
        "wTeaser",
        "wUrl",
        "yUrl",
        "yID"
      );
      expect(movie.wTeaser).to.be.an("string");
      expect(movie.wUrl).to.be.a("string");
      expect(movie.yUrl).to.be.an("string");
      expect(movie.yID).to.be.a("string");
    });
  });

  it("should throw error if no query parameter is provided", async () => {
    try {
      const recs = await tdaw.getRecommendations({ type: "movies" });
    } catch (err) {
      expect(err.message).to.equal("You must provide something to search!");
    }
  });

  it("should throw error if invalid type", async () => {
    try {
      const recs = await tdaw.getRecommendations({
        q: "Forrest Gump",
        type: "fsd"
      });
    } catch (err) {
      expect(err.message).to.equal("fsd isn't a valid type!");
    }
  });

  it("should throw error if invalid val", async () => {
    try {
      const recs = await tdaw.getRecommendations({
        q: "Forrest Gump",
        val: "turtle"
      });
    } catch (err) {
      expect(err.message).to.equal("Value parameter must be either 0 or 1!");
    }
  });

  it("should throw error if invalid info number", async () => {
    try {
      const recs = await tdaw.getRecommendations({
        q: "Ida",
        info: "turtle"
      });
    } catch (err) {
      expect(err.message).to.equal("Value parameter must be either 0 or 1!");
    }
  });

  it("should throw error if limit is not a number", async () => {
    try {
      const recs = await tdaw.getRecommendations({ q: "Ida", limit: "turtle" });
    } catch (err) {
      expect(err.message).to.equal("Limit value must be a number!");
    }
  });

  it("should throw error if callback is not a valid function", async () => {
    const cbErr = 20;

    try {
      const recs = await tdaw.getRecommendations({ q: "Ida", callback: cbErr });
    } catch (err) {
      expect(err.message).to.equal(
        "You must provide a valid callback function!"
      );
    }
  });
});

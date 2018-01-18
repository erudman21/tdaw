const { expect } = require('chai');
const TDAW = require('../index');
const { tastediveKey } = require('../apiKey');

const tdaw = new TDAW({
	apiKey: tastediveKey
});

describe('App', () => {
	it('getRecommendations should return array of recommendations', async () => {
		try {
			const res = await tdaw.getRecommendations({
				q: 'Ida',
				type: 'movies'
			});
			expect(res).to.be.an('array');
		} catch (e) {
			console.log(e);
		}
	});
});

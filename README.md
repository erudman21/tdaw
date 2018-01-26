## An API wrapper for tastedive.com recommendations

### Setup
  $npm install --save tdaw

### Initialize
```javascript
const TDAW = require('tdaw')

const api = new TDAW({
  apiKey: YOUR_API_KEY
})
```

### Example
```javascript
const res = await tdaw.getRecommendations({
  q: 'Good Will Hunting',
  type: 'movies', // Optional
  info: 1, // Optional
  limit: 20, // Optional
  verbose: 1 // Optional
})
```

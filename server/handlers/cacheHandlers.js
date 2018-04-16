const mcache = require('memory-cache');

exports.responseCache = duration => (req, res, next ) => {
  const key = `__express__${req.originalURL || req.url}`;
  const cachedBody = mcache.get(key);
  if (cachedBody)
    res.send(cachedBody); 
  else {
    // destructuring statement below
    // first element stores current .send method
    // second element overrides current .send method with an arrow function
    [res.sendResponse, res.send] = [res.send, (body) => {
      mcache.put(key, body, duration); // store response in mcache
      res.sendResponse(body); // call the orgininal .send method
    }];
    next();
  }
}

const mcache = require('memory-cache');

exports.responseCache = duration => (req, res, next ) => {
  const key = `__express__${req.originalURL || req.url}`;
  const cachedBody = mcache.get(key);
  if (cachedBody) res.send(cachedBody);
  else {
    const refreshResponse = (body) => {
      mcache.put(key, body, duration); // cache body response
      res.sendResponse(body); // call orgininal .send
      // carefull calling property above pre defined
    };

    // store current .send method & then override .send method
    [res.sendResponse, res.send] = [res.send, refreshResponse];
    next(); // pass on to get uncached response
  }
};


/* notes
observation on zeit deployment
  responseTimes 100-200ms faster then uncached alternative
  greatly reduces database calls if server was underload

observation on local deployment
  responseTimes 500ms faster then unchached alternative

*/
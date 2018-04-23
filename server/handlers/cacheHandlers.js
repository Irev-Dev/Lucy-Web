const mcache = require('memory-cache');

function objTravers(obj, k1, ...keys) {
  let output;
  if (obj === undefined) {
    output = undefined;
  } else {
    output = (keys.length === 0 ? obj[k1] : objTravers(obj[k1], ...keys))
  }
  return output;
}

exports.propHelpLookup = objTravers;

exports.skipResponseCacheSettings = {
  rules: [{
    key: 'res.locals.flashes',
    assert: (prop) => {
      return prop !== undefined ? Object.keys(prop).length >= 1 : false;
    }, // will assert there is flashes
  }],
};

const truthy = val => val ? true : false;

exports.skipResponseCache = (settings, details) => {
  return settings.rules.map(rule => rule.assert(objTravers(details, ...rule.key.split('.')))).some(truthy);
};

/*
exports.responseCache = duration => (req, res, next) => {
  if (this.skipResponseCache(this.skipResponseCacheSettings, {req, res})) {
    next();
  } else {
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
  }
};

*/
/* notes
observation on zeit deployment
  responseTimes 100-200ms faster then uncached alternative
  greatly reduces database calls if server was underload

observation on local deployment
  responseTimes 500ms faster then unchached alternative

*/
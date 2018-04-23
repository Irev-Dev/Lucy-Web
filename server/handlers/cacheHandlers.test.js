import { TIMEOUT } from 'dns';

const cacheHandlers = require('./cacheHandlers');


describe('testing object travering logic',() => {
  test('travers 1 level',()=> {
    const obj = { hello: 'whats going on' };
    const key = 'hello';
    expect(cacheHandlers.propHelpLookup(obj, key)).toEqual('whats going on');
  });
  test('travers 3 level',()=> {
    const obj = { person: { partner: { name: 'Jim' } } };
    const key = ['person', 'partner', 'name'];
    expect(cacheHandlers.propHelpLookup(obj, ...key)).toEqual('Jim');
  });
  test('string split method',()=>{
    const obj = { person: { partner: { name: 'Jim' } } };
    const key = 'person.partner.name';
    expect(cacheHandlers.propHelpLookup(obj, ...(key.split('.')))).toEqual('Jim');
  });
});


describe('testing skipCache logic',() => {
  test('testing flash present',()=>{
    const details = { res: { locals: {flashes: { error: ['ops i\'m a flash'] } } } };
    const settings = cacheHandlers.skipResponseCacheSettings;
    expect(cacheHandlers.skipResponseCache(settings, details)).toEqual(true);
  });
  test('testing flash empty object',()=>{
    const details = { res: { locals: {flashes: { } } } };
    const settings = cacheHandlers.skipResponseCacheSettings;
    expect(cacheHandlers.skipResponseCache(settings, details)).toEqual(false);
  });

  test('testing flash undefined',()=>{
    const details = {};
    const settings = cacheHandlers.skipResponseCacheSettings;
    expect(cacheHandlers.skipResponseCache(settings, details)).toEqual(false);
  });
});

describe('testing cache response',()=>{
  const next = () => setTimeout(() => 'stored value', 1000);

  beforeEach(() => {
    // do nothing
  });
  
  afterEach(() => {
    // do nothing
  });


});
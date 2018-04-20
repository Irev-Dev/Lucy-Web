
// this will be where all the client code will be when live


import { $, $$ } from './modules/bling'; // eslint-disable-line
import { log } from 'util'; // eslint-disable-line


const bannerImgs = $('.banner').style;
const body = $('body').style;
const bigOrthWrap = $('.bigorthwrap').style;
const lucyOrtho = $('.feat-img').style;
const secFeatureCards = $('.featC');
const footerIcons = $('.flexicons');


// HTML injection
const contentLib = require('./modules/content');

secFeatureCards.innerHTML = contentLib.featureCards();
footerIcons.innerHTML = contentLib.flexicons();
// CSS image injection - Unable to use shorthand to set background-size
['background', 'backgroundSize'].map((context) => {
  body[context] = contentLib.metalTile(context);
  bannerImgs[context] = contentLib.hero(context);
  bigOrthWrap[context] = contentLib.corners(context);
  bigOrthWrap[context] = contentLib.orangeSlope(context);
  lucyOrtho[context] = contentLib.lucyOrth(context);
  return null;
});
// set refreshing countdown from api
contentLib.startCountDown();

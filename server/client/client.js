
// this will be where all the client code will be when live

import cloudinary from 'cloudinary-core';
import axios from 'axios';

import { $, $$ } from './modules/bling'; // eslint-disable-line
import { log } from 'util'; // eslint-disable-line

// typeAhead( $('.search') );

const cl = new cloudinary.Cloudinary({ cloud_name: 'dwjfssfhq', secure: true });

function hero(context) {
  const bannerImgs = [
    `url(${cl.url('KUR033.Hero.DeepEtch2.png', {
      width: $('body').clientWidth,
      crop: 'scale',
      quality: 'auto',
      fetch_format: 'auto',
    })})top left no-repeat,`,
    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 210 297" preserveAspectRatio="none"><path d="M-.141-.37v299.046h211.115z" fill="%23e16a36"/></svg>') bottom left no-repeat,`, // eslint-disable-line
    'radial-gradient(#000000a8, #000000ff 95%)',
  ];
  if (context === 'backgroundSize') {
    // The shorthand for background dose not work when applying the background size,
    // therefore background-size must also be used
    return 'cover, 100% 100px, cover';
  }
  return bannerImgs.map(img => `${img}`).join('');
}

function corners(context) {
  if (context === 'backgroundSize') {
    return '100% 100%';
  }
  return `url(${cl.url('corners.svg')}) center center no-repeat`;
}

function metalTile(context) {
  if (context === 'backgroundSize') {
    return '200px 200px';
  }
  return `url(${cl.url('lucydrone/metalTile.png')}) repeat fixed`;
}

function orangeSlope(context) {
  const Imgs = [
    // `url(${cl.url('oslope.svg')}) top left no-repeat,`,
    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 210 297" preserveAspectRatio="none"><path d="M211.536 297.607V-1.438H-.436z" fill="%23e16a36"/></svg>') top left no-repeat,`, // eslint-disable-line
    'radial-gradient(#000000a8, #000000ff 95%)',
  ];
  if (context === 'backgroundSize') {
    // shorthand for background not working, background-size must also be used
    return '100% 100px, cover';
  }
  return Imgs.map(img => `${img}`).join('');
}

function lucyOrth(context) {
  if (context === 'backgroundSize') {
    return 'cover';
  }
  return `url(${cl.url('FrontOrthoBlue.png', {
    width: $('.feat-img').clientWidth,
    crop: 'scale',
    quality: 'auto',
    fetch_format: 'auto',
  })}) center center no-repeat`;
}

function featureCards() {
  const feaImgs = [
    { className: 'lift', src: cl.url('lucydrone/card1b'), alt: 'lucy Kwad flying with positive lift' },
    { className: 'drag', src: cl.url('lucydrone/card2b'), alt: 'lucy Kwad flying with minimal air drag' },
  ];
  return feaImgs.map(img => `<img class="${img.className}" src="${img.src}" alt="${img.alt}">`).join('');
}
function flexicons() {
  const icons = [
    { src: cl.url('lucydrone/SCAD3'), alt: 'OpenScad logo', title: 'OpenSCAD' },
    { src: cl.url('lucydrone/Blender2'), alt: 'Blender logo', title: 'Blender' },
    { src: cl.url('lucydrone/osh3'), alt: 'Open source hardware logo', title: 'Open Source Hardware' },
    { src: cl.url('lucydrone/gpl3-4'), alt: 'Gpl3 license logo', title: 'Free as in Freedom' },
  ];
  return icons.map(icon => `
    <div>
      <img src="${icon.src}" alt="${icon.alt}">
      <h4>${icon.title}</h4>
    </div>
  `).join('');
}

const bannerImgs = $('.banner').style;
const body = $('body').style;
const bigOrthWrap = $('.bigorthwrap').style;
const lucyOrtho = $('.feat-img').style;
const secFeatureCards = $('.featC');
const footerIcons = $('.flexicons');

// HTML image injection
secFeatureCards.innerHTML = featureCards();
footerIcons.innerHTML = flexicons();

// CSS image injection - Unable to use shorthand to set background-size
['background', 'backgroundSize'].map((context) => {
  body[context] = metalTile(context);
  bannerImgs[context] = hero(context);
  bigOrthWrap[context] = corners(context);
  bigOrthWrap[context] = orangeSlope(context);
  lucyOrtho[context] = lucyOrth(context);
  return null;
});

function countDown() {
  axios.get('/api/countdown').then((res) => {
    $('.places-left').innerHTML = res.data.total - res.data.count;
  }).catch((err) => {
    console.error(err);
  });
}

countDown();

function startCountDown() {
  setInterval(countDown, 10000);
}

startCountDown();

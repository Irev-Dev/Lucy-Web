
// this will be where all the client code will live

import cloudinary from 'cloudinary-core';

import { $, $$ } from './modules/bling'; // eslint-disable-line
import { log } from 'util'; // eslint-disable-line

// typeAhead( $('.search') );

const cl = new cloudinary.Cloudinary({ cloud_name: 'dwjfssfhq', secure: true });

function hero(context) {
  const bannerImgs = [
    `url(${cl.url('oslope5.svg')}) bottom left no-repeat,`,
    `url(${cl.url('KUR033.Hero.DeepEtch2.png', {
      width: $('body').clientWidth,
      crop: 'scale',
      quality: 'auto',
      fetch_format: 'auto',
    })})top left no-repeat,`,
    'radial-gradient(#000000a8, #000000ff 95%)',
  ];
  if (context === 'backgroundSize') {
    // shorthand for background not working, background-size must also be used
    return '100% 100px, cover, cover';
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
    `url(${cl.url('oslope.svg')}) top left no-repeat,`,
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
    { className: 'lift', src: cl.url('lucydrone/card1.png'), alt: 'did this work' },
    { className: 'drag', src: cl.url('lucydrone/card2'), alt: 'yes no?' },
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
const cornerSvg = $('.pitch__div').style;
const body = $('body').style;
const bigOrthWrap = $('.bigorthwrap').style;
const lucyOrtho = $('.feat-img').style;
const secFeatureCards = $('.lite.featC');
const footerIcons = $('.flexicons');

// HTML image injection
secFeatureCards.innerHTML = featureCards();
footerIcons.innerHTML = flexicons();

// CSS image injection - Unable to use shorthand to set background-size
['background', 'backgroundSize'].map((context) => {
  bannerImgs[context] = hero(context);
  cornerSvg[context] = corners(context);
  body[context] = metalTile(context);
  bigOrthWrap[context] = orangeSlope(context);
  lucyOrtho[context] = lucyOrth(context);
  return null;
});

// document.onreadystatechange = () => {
// const htlpChk = $('#contribute'); // document.querySelector('#contribute');
// const submit2 = $('#submit2'); // document.querySelector('#submit2');
// };

$('#contribute').addEventListener('change', (e) => {
  if (e.target.checked) {
    $('#submit2').value = 'I Want To Contribute!';
  } else {
    $('#submit2').value = 'Sign Me Up! (updates only)';
  }
});
/*

//};
*/

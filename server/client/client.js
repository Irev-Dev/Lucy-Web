
// this will be where all the client code will live

import cloudinary from 'cloudinary-core';

import { $, $$ } from './modules/bling';
import { log } from 'util';

// typeAhead( $('.search') );

const cl = new cloudinary.Cloudinary({ cloud_name: 'dwjfssfhq', secure: true });

function hero(context) {
  const bannerImgs = [
    `url(${cl.url('oslope5.svg')}) bottom left no-repeat,`,
    `url(${cl.url('KUR033.Hero.DeepEtch2.png')})top left no-repeat,`,
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

// document.onreadystatechange = () => {
// const htlpChk = $('#contribute'); // document.querySelector('#contribute');
// const submit2 = $('#submit2'); // document.querySelector('#submit2');
const bannerImgs = $('.banner').style;
const cornerSvg = $('.pitch__div').style;
const secFeatureCards = $('.lite.featC');
const footerIcons = $('.flexicons');

// HTML image injection
secFeatureCards.innerHTML = featureCards();
footerIcons.innerHTML = flexicons();

// CSS image injection - Unable to use shorthand to set background-size
['background', 'backgroundSize'].map(context => {
  bannerImgs[context] = hero(context);
  cornerSvg[context] = corners(context);
});

/*

};

  htlpChk.addEventListener('change', (e) => {
    if (e.target.checked) {
      submit2.value = 'I Want To Contribute!';
    } else {
      submit2.value = 'Sign Me Up! (updates only)';
    }
  });
/*

//};
*/

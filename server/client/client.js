
// this will be where all the client code will live

import cloudinary from 'cloudinary-core';

import { $, $$ } from './modules/bling';

// typeAhead( $('.search') );

const cl = new cloudinary.Cloudinary({ cloud_name: 'dwjfssfhq', secure: true });

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
const secFeatureCards = $('.lite.featC');
const footerIcons = $('.flexicons');

secFeatureCards.innerHTML = featureCards();
footerIcons.innerHTML = flexicons();
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

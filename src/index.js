import {
  projectsCallback,
  homeCallback,
  contactCallback,
  aboutCallback,
} from './js modules/intersectionObservers.js';

// Switching active class between links on click / event delegation
// ------------------------------------- //
const parentUl = document.querySelector('.nav-right__ul');
export const links = document.querySelectorAll('.nav-right__link');

parentUl.addEventListener('click', function (e) {
  // return if clicked on blank space in the parentUl
  if (e.target.classList.contains('nav-right__ul')) return;
  // logic for clicking on the 'span' element inside of the 'a' element
  if (e.target.classList.contains('nav-right__link-ordinal')) {
    const parentLink = e.target.closest('a').classList.contains('active');
    if (parentLink) return;
    links.forEach(link => link.classList.remove('active'));
    e.target.closest('.nav-right__link').classList.add('active');
  }
  // logic for clicking on the 'a' element
  if (e.target.classList.contains('nav-right__link')) {
    if (e.target.classList.contains('active')) return;

    links.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// scroll progress bar & box shadow on header element
// --------------------------------------------------------------------- //
const progressBarFiller = document.querySelector('.nav-progress');
const header = document.querySelector('.header');

document.addEventListener('scroll', function () {
  const windowScroll =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percentage = (windowScroll / height) * 100;
  // add/remove box-shadow from header
  percentage > 9
    ? header.classList.add('box-shadow')
    : header.classList.remove('box-shadow');

  progressBarFiller.style.width = `${percentage}%`;
});

// toggling light/dark mode
// ---------------------------------------------------------------------- //
const toggleContainer = document.querySelector('.nav-left__toggler');
const body = document.querySelector('body');

toggleContainer.addEventListener('click', function (e) {
  const sunIcon = document.querySelector('.fa-sun');
  const moonIcon = document.querySelector('.fa-moon');

  if (e.target.classList.contains('fa-moon')) {
    moonIcon.style.display = 'none';
    body.dataset.theme = 'dark';
    sunIcon.style.display = 'block';
    // console.log(document.querySelector('#sw-gradient-0'));
  } else {
    sunIcon.style.display = 'none';
    body.dataset.theme = 'default';
    moonIcon.style.display = 'block';
  }
});

// Show/hide navigation when clicked on hamburger menu on small screens
// ---------------------------------------------------------------------- //
const toggler = document.querySelector('#toggle');
const topMenu = document.querySelector('.top-menu');

toggler.addEventListener('click', function () {
  if (this.checked) {
    topMenu.style.top = '0';
  } else {
    topMenu.style.top = '-22rem';
  }
});

// ------------------------------------------------------------------- //
// Close hamburger menu when top menu link is clicked
// ------------------------------------------------------------------- //

topMenu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('top-menu__a')) return;

  toggler.checked = false;
  this.style.top = '-22rem';
});

// ------------------------------------------------------------------- //
// Close hamburger menu automatically if window is resized to more than 900px
// ------------------------------------------------------------------- //

window.addEventListener('resize', function () {
  const width = window.innerWidth;
  if (toggler.checked && width > 900) {
    toggler.checked = false;
    topMenu.style.top = '-22rem';
  } else return;
});

// ------------------------------------------------------------------- //
// projects gallery slider manipulation
// ------------------------------------------------------------------- //
const images = document.querySelectorAll('.project');
const rightArrow = document.querySelector('.frame-arrow__right');
const leftArrow = document.querySelector('.frame-arrow__left');
const dotsContainer = document.querySelector('.dots-container');

const imagesAdvanced = document.querySelectorAll('.project__advanced');
const rightArrowAdvanced = document.querySelector(
  '.frame-arrow__right--advanced'
);
const leftArrowAdvanced = document.querySelector(
  '.frame-arrow__left--advanced'
);
const dotsContainerAdvanced = document.querySelector(
  '.dots-container__advanced'
);

const data = {
  currentImage: 0,
  currentImageAdvanced: 0,
  threshold: images.length - 1,
  thresholdAdvanced: imagesAdvanced.length - 1,
};

function goToImage(projectsArray, imageNum) {
  projectsArray.forEach(
    (img, i) => (img.style.transform = `translateX(${100 * (i - imageNum)}%`)
  );
}
goToImage(images, 0);
goToImage(imagesAdvanced, 0);

//  create dots under projects container
function createDots(projectsArray, dotType, dotsContainerName) {
  projectsArray.forEach((_, i) => {
    const html = `<span class="${dotType}" data-image="${i}"></span>`;
    dotsContainerName.insertAdjacentHTML('beforeend', html);
  });
}
createDots(images, 'dot', dotsContainer);
createDots(imagesAdvanced, 'dot__advanced', dotsContainerAdvanced);

// Add active class to current dot
function activateDot(currSlide, dotType) {
  document
    .querySelectorAll(`.${dotType}`)
    .forEach(dot => dot.classList.remove('dot-active'));
  document
    .querySelector(`.${dotType}[data-image="${currSlide}"]`)
    .classList.add('dot-active');
}
activateDot(0, 'dot');
activateDot(0, 'dot__advanced');

function moveRight(e) {
  if (!e.target.classList.contains('right-advanced')) {
    data.currentImage === data.threshold
      ? (data.currentImage = 0)
      : data.currentImage++;
    activateDot(data.currentImage, 'dot');
    goToImage(images, data.currentImage);
  } else {
    data.currentImageAdvanced === data.thresholdAdvanced
      ? (data.currentImageAdvanced = 0)
      : data.currentImageAdvanced++;
    activateDot(data.currentImageAdvanced, 'dot__advanced');
    goToImage(imagesAdvanced, data.currentImageAdvanced);
  }
}

function moveLeft(e) {
  if (!e.target.classList.contains('left-advanced')) {
    data.currentImage === 0
      ? (data.currentImage = data.threshold)
      : data.currentImage--;
    activateDot(data.currentImage, 'dot');
    goToImage(images, data.currentImage);
  } else {
    data.currentImageAdvanced === 0
      ? (data.currentImageAdvanced = data.thresholdAdvanced)
      : data.currentImageAdvanced--;
    activateDot(data.currentImageAdvanced, 'dot__advanced');
    goToImage(imagesAdvanced, data.currentImageAdvanced);
  }
}

// browse trough projects
rightArrow.addEventListener('click', moveRight);
rightArrowAdvanced.addEventListener('click', moveRight);
leftArrow.addEventListener('click', moveLeft);
leftArrowAdvanced.addEventListener('click', moveLeft);
// go to specific project by clicking on the dot REFACTOR
dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot')) return;
  const imgNumber = e.target.dataset.image;
  data.currentImage = Number(imgNumber);
  activateDot(imgNumber, 'dot');
  goToImage(images, imgNumber);
});

dotsContainerAdvanced.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot__advanced')) return;
  const imgNumber = e.target.dataset.image;
  data.currentImageAdvanced = Number(imgNumber);
  activateDot(imgNumber, 'dot__advanced');
  goToImage(imagesAdvanced, imgNumber);
});

// ------------------------------------------------------------------- //
// Open modal to zoom in the thumbnail project picture
// ------------------------------------------------------------------- //
const modalContainer = document.querySelector('.modal-container');
const createModal = function (img, className = 'zoomed-img') {
  const html = `<div class="modal__zoom--content add-width">
  <img src="${img}" alt="Zoomed image" class="${className}" />
</div>`;
  modalContainer.insertAdjacentHTML('beforeend', html);
};
const removeModal = function (el) {
  el.innerHTML = '';
};

const thumbnailsParentDiv = document.querySelector('.frame');
const thumbnailsParentDivAdvanced = document.querySelector('.frame__advanced');

thumbnailsParentDiv.addEventListener('click', function (e) {
  if (!e.target.classList.contains('project-left__image')) return;

  const url = e.target.getAttribute('src');
  createModal(url);
});

thumbnailsParentDivAdvanced.addEventListener('click', function (e) {
  if (!e.target.classList.contains('project-left__image--advanced')) return;

  const url = e.target.getAttribute('src');
  createModal(url);
});
// close zoomed thumbnail
body.addEventListener('click', function (e) {
  if (!e.target.classList.contains('modal__zoom--content')) return;
  removeModal(modalContainer);
});
// ------------------------------------------------------------------- //
// Zoom in collage image
// ------------------------------------------------------------------- //
const collage = document.querySelector('.collage');
collage.addEventListener('click', e => {
  if (!e.target.classList.contains('collage')) return;
  const url = e.target.getAttribute('src');
  createModal(url, 'zoomed-img-collage');
});
// ------------------------------------------------------------------- //
// Scroll to top of the page on refresh
// ------------------------------------------------------------------- //
window.addEventListener('load', function () {
  this.window.scrollTo(0, 0);
});
// ------------------------------------------------------------------- //
// Add / remove active class on header links depending on scroll position
// ------------------------------------------------------------------- //
// observer callback functions are located in the separate js module

const homeSection = document.querySelector('#main');
const projectsSection = document.querySelector('#projects');
const aboutSection = document.querySelector('#about');
const contactSection = document.querySelector('#contact');

// home section --------------------------------------------------------//
const homeOptions = {
  root: null,
  threshold: 0,
  // rootMargin: '350px',
};
const homeObserver = new IntersectionObserver(homeCallback, homeOptions);
homeObserver.observe(homeSection);

// projects section ----------------------------------------------------//
const projectsOptions = {
  root: null,
  // changed from 0.9 to 0.5 to make the projects section appear earlier
  threshold: 0.5,
};
const projectsObserver = new IntersectionObserver(
  projectsCallback,
  projectsOptions
);
projectsObserver.observe(projectsSection);

// contact section -----------------------------------------------------//
const contactOptions = {
  root: null,
  threshold: 0.8,
};
const contactObserver = new IntersectionObserver(
  contactCallback,
  contactOptions
);
contactObserver.observe(contactSection);
// about section --------------------------------------------------------------------//
const aboutOptions = {
  root: null,
  threshold: 0.2,
};
const aboutObserver = new IntersectionObserver(aboutCallback, aboutOptions);
aboutObserver.observe(aboutSection);

// Switching active class between links / event delegation
// ------------------------------------- //
const parentUl = document.querySelector('.nav-right__ul');
const links = document.querySelectorAll('.nav-right__link');

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
// ------------------------------------- //
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
  percentage > 17
    ? header.classList.add('box-shadow')
    : header.classList.remove('box-shadow');

  progressBarFiller.style.width = `${percentage}%`;
});

// toggling light/dark mode
// ------------------------------------- //
const toggleContainer = document.querySelector('.nav-left__toggler');
const body = document.querySelector('body');

toggleContainer.addEventListener('click', function (e) {
  const sunIcon = document.querySelector('.fa-sun');
  const moonIcon = document.querySelector('.fa-moon');

  if (e.target.classList.contains('fa-moon')) {
    moonIcon.style.display = 'none';
    body.dataset.theme = 'dark';
    sunIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'none';
    body.dataset.theme = 'default';
    moonIcon.style.display = 'block';
  }
});

// Show/hide navigation when clicked on hamburger menu on small screens
// ------------------------------------- //
const toggler = document.querySelector('#toggle');
const topMenu = document.querySelector('.top-menu');

toggler.addEventListener('click', function () {
  if (this.checked) {
    topMenu.style.top = '0';
  } else {
    topMenu.style.top = '-22rem';
  }
});

// Close hamburger menu when top menu link is clicked
// ------------------------------------- //
topMenu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('top-menu__a')) return;

  toggler.checked = false;
  this.style.top = '-22rem';
});

// Close hamburger menu automatically if window is resized to more than 900px
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  if (toggler.checked && width > 900) {
    toggler.checked = false;
    topMenu.style.top = '-22rem';
  } else return;
});

// projects gallery slider manipulation
// ------------------------------------- //
const images = document.querySelectorAll('.project');
const rightArrow = document.querySelector('.frame-arrow__right');
const leftArrow = document.querySelector('.frame-arrow__left');

const data = {
  currentImage: 0,
  threshold: images.length - 1,
};

function goToImage(imageNum) {
  images.forEach(
    (img, i) => (img.style.transform = `translateX(${100 * (i - imageNum)}%`)
  );
}
goToImage(0);
//  create dots under projects container
const dotsContainer = document.querySelector('.dots-container');
function createDots() {
  images.forEach((image, i) => {
    const html = `<span class="dot" data-image="${i}"></span>`;
    dotsContainer.insertAdjacentHTML('beforeend', html);
  });
}
createDots();
// Add active class to current dot
function activateDot(currSlide) {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('dot-active'));
  document
    .querySelector(`.dot[data-image="${currSlide}"]`)
    .classList.add('dot-active');
}
activateDot(0);

function moveRight() {
  if (data.currentImage === data.threshold) {
    data.currentImage = 0;
  } else {
    data.currentImage++;
  }

  activateDot(data.currentImage);
  goToImage(data.currentImage);
}

function moveLeft() {
  if (data.currentImage === 0) {
    data.currentImage = data.threshold;
  } else {
    data.currentImage--;
  }

  activateDot(data.currentImage);
  goToImage(data.currentImage);
}

rightArrow.addEventListener('click', moveRight);
leftArrow.addEventListener('click', moveLeft);

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot')) return;
  const imgNumber = e.target.dataset.image;
  data.currentImage = Number(imgNumber);
  activateDot(imgNumber);
  goToImage(imgNumber);
});

// Open modal to zoom in the thumbnail project picture
// ------------------------------------- //
const modalContainer = document.querySelector('.modal-container');
const createModal = function (img) {
  const html = `<div class="modal__zoom--content add-width">
  <img src="${img}" alt="Zoomed image" class="zoomed-img" />
</div>`;
  modalContainer.insertAdjacentHTML('beforeend', html);
};
const removeModal = function (el) {
  el.innerHTML = '';
};

const thumbnailsParentDiv = document.querySelector('.frame');

thumbnailsParentDiv.addEventListener('click', function (e) {
  if (!e.target.classList.contains('project-left__image')) return;

  const url = e.target.getAttribute('src');
  createModal(url);
});
// close zoomed thumbnail
body.addEventListener('click', function (e) {
  if (!e.target.classList.contains('modal__zoom--content')) return;
  removeModal(modalContainer);
});

// Add / remove active class on header links depending on scroll position
// ------------------------------------- //
const projectsCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.remove('active');
      });
      document
        .querySelector('.nav-right__link--projects')
        .classList.add('active');
    }
  });
};

const projectsOptions = {
  root: null,
  threshold: 0.9,
};
const contactSection = document.querySelector('#contact');
const projectsSection = document.querySelector('#projects');
const homeSection = document.querySelector('#main');

const projectsObserver = new IntersectionObserver(
  projectsCallback,
  projectsOptions
);
projectsObserver.observe(projectsSection);
const contactOptions = {
  root: null,
  threshold: 0.8,
};
const contactObserver = new IntersectionObserver(() => {
  links.forEach(link => {
    link.classList.remove('active');
  });
  document.querySelector('.nav-right__link--contact').classList.add('active');
}, contactOptions);
contactObserver.observe(contactSection);
const homeOptions = {
  root: null,
  threshold: 0,
  // rootMargin: '350px',
};
const homeObserver = new IntersectionObserver(() => {
  links.forEach(link => {
    link.classList.remove('active');
  });
  document.querySelector('.nav-right__link--home').classList.add('active');
}, homeOptions);
homeObserver.observe(homeSection);
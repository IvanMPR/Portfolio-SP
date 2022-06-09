import { links } from '../index.js';

export function homeCallback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector('.nav-right__link--home').classList.add('active');
    }
  });
}

export function projectsCallback(entries) {
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
}

export function contactCallback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.remove('active');
      });
      document
        .querySelector('.nav-right__link--contact')
        .classList.add('active');
    }
  });
}

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// Switching active class between links / event delegation
// ------------------------------------- //
var parentUl = document.querySelector('.nav-right__ul');
var links = document.querySelectorAll('.nav-right__link');
parentUl.addEventListener('click', function (e) {
  // return if clicked on blank space in the parentUl
  if (e.target.classList.contains('nav-right__ul')) return; // logic for clicking on the 'span' element inside of the 'a' element

  if (e.target.classList.contains('nav-right__link-ordinal')) {
    var parentLink = e.target.closest('a').classList.contains('active');
    if (parentLink) return;
    links.forEach(function (link) {
      return link.classList.remove('active');
    });
    e.target.closest('.nav-right__link').classList.add('active');
  } // logic for clicking on the 'a' element


  if (e.target.classList.contains('nav-right__link')) {
    if (e.target.classList.contains('active')) return;
    links.forEach(function (link) {
      return link.classList.remove('active');
    });
    e.target.classList.add('active');
  }
}); // scroll progress bar & box shadow on header element
// ------------------------------------- //

var progressBarFiller = document.querySelector('.nav-progress');
var header = document.querySelector('.header');
document.addEventListener('scroll', function () {
  var windowScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var percentage = windowScroll / height * 100; // add/remove box-shadow from header

  percentage > 17 ? header.classList.add('box-shadow') : header.classList.remove('box-shadow');
  progressBarFiller.style.width = "".concat(percentage, "%");
}); // toggling light/dark mode
// ------------------------------------- //

var toggleContainer = document.querySelector('.nav-left__toggler');
var body = document.querySelector('body');
toggleContainer.addEventListener('click', function (e) {
  var sunIcon = document.querySelector('.fa-sun');
  var moonIcon = document.querySelector('.fa-moon');

  if (e.target.classList.contains('fa-moon')) {
    moonIcon.style.display = 'none';
    body.dataset.theme = 'dark';
    sunIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'none';
    body.dataset.theme = 'default';
    moonIcon.style.display = 'block';
  }
}); // Show/hide navigation when clicked on hamburger menu on small screens
// ------------------------------------- //

var toggler = document.querySelector('#toggle');
var topMenu = document.querySelector('.top-menu');
toggler.addEventListener('click', function () {
  if (this.checked) {
    topMenu.style.top = '0';
  } else {
    topMenu.style.top = '-22rem';
  }
}); // Close hamburger menu when top menu link is clicked
// ------------------------------------- //

topMenu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('top-menu__a')) return;
  toggler.checked = false;
  this.style.top = '-22rem';
}); // Close hamburger menu automatically if window is resized to more than 900px

window.addEventListener('resize', function () {
  var width = window.innerWidth;

  if (toggler.checked && width > 900) {
    toggler.checked = false;
    topMenu.style.top = '-22rem';
  } else return;
}); // projects gallery slider manipulation
// ------------------------------------- //

var images = document.querySelectorAll('.project');
var rightArrow = document.querySelector('.frame-arrow__right');
var leftArrow = document.querySelector('.frame-arrow__left');
var data = {
  currentImage: 0,
  threshold: images.length - 1
};

function goToImage(imageNum) {
  images.forEach(function (img, i) {
    return img.style.transform = "translateX(".concat(100 * (i - imageNum), "%");
  });
}

goToImage(0); //  create dots under projects container

var dotsContainer = document.querySelector('.dots-container');

function createDots() {
  images.forEach(function (image, i) {
    var html = "<span class=\"dot\" data-image=\"".concat(i, "\"></span>");
    dotsContainer.insertAdjacentHTML('beforeend', html);
  });
}

createDots(); // Add active class to current dot

function activateDot(currSlide) {
  document.querySelectorAll('.dot').forEach(function (dot) {
    return dot.classList.remove('dot-active');
  });
  document.querySelector(".dot[data-image=\"".concat(currSlide, "\"]")).classList.add('dot-active');
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
  var imgNumber = e.target.dataset.image;
  data.currentImage = Number(imgNumber);
  activateDot(imgNumber);
  goToImage(imgNumber);
}); // Open modal to zoom in the thumbnail project picture
// ------------------------------------- //

var modalContainer = document.querySelector('.modal-container');

var createModal = function createModal(img) {
  var html = "<div class=\"modal__zoom--content add-width\">\n  <img src=\"".concat(img, "\" alt=\"Zoomed image\" class=\"zoomed-img\" />\n</div>");
  modalContainer.insertAdjacentHTML('beforeend', html);
};

var removeModal = function removeModal(el) {
  el.innerHTML = '';
};

var thumbnailsParentDiv = document.querySelector('.frame');
thumbnailsParentDiv.addEventListener('click', function (e) {
  if (!e.target.classList.contains('project-left__image')) return;
  var url = e.target.getAttribute('src');
  createModal(url);
}); // close zoomed thumbnail

body.addEventListener('click', function (e) {
  if (!e.target.classList.contains('modal__zoom--content')) return;
  removeModal(modalContainer);
}); // Add / remove active class on header links depending on scroll position
// ------------------------------------- //

var projectsCallback = function projectsCallback(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      links.forEach(function (link) {
        link.classList.remove('active');
      });
      document.querySelector('.nav-right__link--projects').classList.add('active');
    }
  });
};

var projectsOptions = {
  root: null,
  threshold: 0.9
};
var contactSection = document.querySelector('#contact');
var projectsSection = document.querySelector('#projects');
var homeSection = document.querySelector('#main');
var projectsObserver = new IntersectionObserver(projectsCallback, projectsOptions);
projectsObserver.observe(projectsSection);
var contactOptions = {
  root: null,
  threshold: 0.8
};
var contactObserver = new IntersectionObserver(function () {
  links.forEach(function (link) {
    link.classList.remove('active');
  });
  document.querySelector('.nav-right__link--contact').classList.add('active');
}, contactOptions);
contactObserver.observe(contactSection);
var homeOptions = {
  root: null,
  threshold: 0 // rootMargin: '350px',

};
var homeObserver = new IntersectionObserver(function () {
  links.forEach(function (link) {
    link.classList.remove('active');
  });
  document.querySelector('.nav-right__link--home').classList.add('active');
}, homeOptions);
homeObserver.observe(homeSection);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65311" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map
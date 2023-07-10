/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((module) => {

function clas(){
  // Class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...rest) {
      this.src = src;
      this.alt = alt;
      this.descr = descr;
      this.title = title;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = rest;
      this.usdUzs = 11000;
      this.changeUzs();
    }

    changeUzs() {
      this.price = this.price * this.usdUzs;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((item) => {
          element.classList.add(item);
        });
      }
      element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}" />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> UZS/month</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  // AXIOS - kutubxonasi bilan ishlash. Bu bizga object qaytaradi va uning ichidagi data kalit so'zi orqali serverdan kelgan datalarni olishimiz mumkin!
  axios.get('http://localhost:3000/menu').then(data=>{
    // console.log(data);
    data.data.forEach(({img,alt,title,desc,price})=>{
      new MenuCard(img,alt,title,desc,price,'.menu .container').render();
    })
  });
}

module.exports = clas;

/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((module) => {

function form(){
  // Forms
  const msg = {
    load: "Loading",
    success: "Thank's for submitting our form!",
    failure: "Oops!. Somthing went wrong!",
  };

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    bindPostDate(form);
  });

  // async - asinxron funksiya yaratish

  async function postData(url , data){
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-type": 'application/json'},
        body: data,
      })
    ;

    return await res.json();

      // await - bu kutish buyruqi ya'ni masalan resni qaytarishi uchun uni bajarilishini kutadi
  }

  function bindPostDate(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); //Brauzerni default qiymatini o'chiradi

      const statusMessage = document.createElement("div");
      statusMessage.textContent = msg.load;
      statusMessage.style.textAlign = "center";
      form.append(statusMessage);

      const formData = new FormData(form);

      form.insertAdjacentElement("afterend", statusMessage);
      //                   (objectga o'girish metodi) (massivga o'girish metodi)
      const json = JSON.stringify(Object.fromEntries(formData.entries())) 

      postData('http://localhost:3000/request' , json)
        .then((data) => {
          console.log(data);
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(()=>{
          form.reset();
        })
      ;
      
      // const request = new XMLHttpRequest();
      // request.open('POST','server.php');
      // request.setRequestHeader('Content-type', 'application/json');
      

      // const json = JSON.stringify(obj);

      // request.send(json);

      // request.addEventListener('load',()=>{
      //     if(request.status === 200){
      //         console.log(request.response);
      //         showThanksModal(msg.success);
      //         form.reset();
      //         setTimeout(()=>{
      //             statusMessage.remove();
      //         },2000);
      //     }
      //     else{
      //         showThanksModal(msg.failure);
      //     }
      // })
    });
  }

  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog");
    prevModal.classList.add("hide");
    openModal();
    const showModal = document.createElement("div");
    showModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">
                  ${message}
                </div>
            </div>
        `;

    document.querySelector(".modal").append(showModal);
    setTimeout(() => {
      showModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal();
    }, 4000);
  };
}

module.exports = form;

/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((module) => {

function loader(){
  loader = document.querySelector(".loader");
    
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
}

module.exports = loader

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((module) => {

function modal(){
  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
  modal = document.querySelector(".modal");
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    clearInterval(setIntervalId);
  }
  
  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });
  
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.getAttribute("data-close") == ""
      ) {
        closeModal();
      }
    });
    
    document.addEventListener("keydown", (e) => {
      if (e.code == "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
    
    const setIntervalId = setTimeout(openModal, 50000);
    
    function openModalByScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
        ) {
          openModal();
          document.removeEventListener("scroll", openModalByScroll);
        }
      }
      
      document.addEventListener("scroll", openModalByScroll);
  }
    
  module.exports = modal;

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((module) => {

function slider(){
  // Slides

  const slides = document.querySelectorAll('.offer__slide'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector('.offer__slider')
  ;


  let slideInd = 1;
  let offset = 0;
  // =======================================================================
  //                          CAROUSEL SLIDER 
  // =======================================================================
  

  function deleteNotDigits(str){
    return parseFloat(str.replace(/px||em||rem||\%/g, ''));
  }
  

  if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideInd}`;
  }else{
    total.textContent = slides.length;
    current.textContent = slideInd;
  }
  
  
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesWrapper.style.overflow = 'hidden'
  slidesField.style.transition = '.5s ease-out all'
  slides.forEach(slide =>{
    slide.style.width = width;
  });

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);


  for(let i=0 ; i<slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to',i+1);
    dot.classList.add('carousel-dots');
    if(i==0){dot.style.opacity = 1;}
    indicators.append(dot);
    dots.push(dot)
  }

  dots.forEach(dot =>{
    dot.addEventListener('click',(e)=>{
      const slideTo = e.target.getAttribute('data-slide-to');
      slideInd = slideTo;
      
      offset = deleteNotDigits(width)*(slideTo-1)
      slidesField.style.transform =  `translateX(-${offset}px)`;

      if(slides.length < 10){
        current.textContent = `0${slideInd}`;
      }else{
        current.textContent = slideInd;
      }

      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideInd - 1].style.opacity = 1;

    });
  })



  next.addEventListener('click',()=>{
    if(offset == deleteNotDigits(width)*(slides.length-1)){
      offset = 0;
    }else{
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform =  `translateX(-${offset}px)`;
    if(slideInd == slides.length){
      slideInd = 1;
    }else{
      slideInd ++;
    }

    if(slides.length < 10){
      current.textContent = `0${slideInd}`;
    }else{
      current.textContent = slideInd;
    }

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideInd - 1].style.opacity = 1;
  })

  prev.addEventListener('click',()=>{
    if(offset == 0){
      offset = deleteNotDigits(width)*(slides.length-1);
    }else{
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform =  `translateX(-${offset}px)`;

    if(slideInd == 1){
      slideInd = slides.length;
    }else{
      slideInd --;
    }
    if(slides.length < 10){
      current.textContent = `0${slideInd}`;
    }else{
      current.textContent = slideInd;
    }

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideInd - 1].style.opacity = 1;
  });

}

module.exports = slider;

/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((module) => {

function tab(){
  const tabParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, inx) => {
        if (item == target) {
          hideTabContent();
          showTabContent(inx);
        }
      });
    }
  });
}

module.exports = tab

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((module) => {

function timer(){
  const deadline = "2024-08-11";

  function getTimeRemaining(endTime) {
    const timer = Date.parse(endTime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / (1000 * 60)) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getThero(time) {
    if (time >= 0 && time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(uppdateClock, 1000);
    uppdateClock();

    function uppdateClock() {
      const t = getTimeRemaining(endTime);
      days.innerHTML = getThero(t.days);
      hours.innerHTML = getThero(t.hours);
      minutes.innerHTML = getThero(t.minutes);
      seconds.innerHTML = getThero(t.seconds);

      if (timer < 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setInterval(setClock(".timer", deadline), 1000);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
// npx prettier --write js/script.js -- for formatting code


//  Bu listener vebsite ishga tushgandan keyin javascript ishga tushishi uchun ishlatiladi
window.addEventListener("DOMContentLoaded", () => {
  const clas = __webpack_require__(/*! ../modules/class */ "./src/modules/class.js"),
  form = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js"),
  loader = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js"),
  modal = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js"),
  slider = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js"),
  tab = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js"),
  timer = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");

  clas();
  form();
  loader();
  modal();
  slider();
  tab();
  timer(); 
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
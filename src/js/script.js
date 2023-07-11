// npx prettier --write js/script.js -- for formatting code

import clas from "../modules/class"
import form from "../modules/form"
import loader from "../modules/loader"
import modal from "../modules/modal"
import slider from "../modules/slider"
import tab from "../modules/tab"
import timer from "../modules/timer"
import { openModal } from "../modules/modal"

//  Bu listener vebsite ishga tushgandan keyin javascript ishga tushishi uchun ishlatiladi
window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 5000)
  clas()
  form("form", modalTimerId)
  loader()
  modal("[data-modal]", ".modal", modalTimerId)
  slider({
    container: ".offer__slider",
    currentCounter: "#current",
    totalCounter: "#total",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  })
  tab(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active",
  )
  timer(".timer", "2024-08-11")
})

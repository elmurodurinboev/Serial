function slider({
  container,
  currentCounter,
  totalCounter,
  nextArrow,
  prevArrow,
  slide,
  wrapper,
  field,
}) {
  // Slides

  const slides = document.querySelectorAll(slide),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(container)
  let slideInd = 1
  let offset = 0
  // =======================================================================
  //                          CAROUSEL SLIDER
  // =======================================================================

  function deleteNotDigits(str) {
    return parseFloat(str.replace(/px||em||rem||\%/g, ""))
  }

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`
    current.textContent = `0${slideInd}`
  } else {
    total.textContent = slides.length
    current.textContent = slideInd
  }

  slidesField.style.width = 100 * slides.length + "%"
  slidesField.style.display = "flex"
  slidesWrapper.style.overflow = "hidden"
  slidesField.style.transition = ".5s ease-out all"
  slides.forEach((slide) => {
    slide.style.width = width
  })

  const indicators = document.createElement("ol")
  const dots = []
  indicators.classList.add("carousel-indicators")
  slider.append(indicators)

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li")
    dot.setAttribute("data-slide-to", i + 1)
    dot.classList.add("carousel-dots")
    if (i == 0) {
      dot.style.opacity = 1
    }
    indicators.append(dot)
    dots.push(dot)
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to")
      slideInd = slideTo

      offset = deleteNotDigits(width) * (slideTo - 1)
      slidesField.style.transform = `translateX(-${offset}px)`

      if (slides.length < 10) {
        current.textContent = `0${slideInd}`
      } else {
        current.textContent = slideInd
      }

      dots.forEach((dot) => (dot.style.opacity = "0.5"))
      dots[slideInd - 1].style.opacity = 1
    })
  })

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0
    } else {
      offset += deleteNotDigits(width)
    }
    slidesField.style.transform = `translateX(-${offset}px)`
    if (slideInd == slides.length) {
      slideInd = 1
    } else {
      slideInd++
    }

    if (slides.length < 10) {
      current.textContent = `0${slideInd}`
    } else {
      current.textContent = slideInd
    }

    dots.forEach((dot) => (dot.style.opacity = "0.5"))
    dots[slideInd - 1].style.opacity = 1
  })

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1)
    } else {
      offset -= deleteNotDigits(width)
    }
    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideInd == 1) {
      slideInd = slides.length
    } else {
      slideInd--
    }
    if (slides.length < 10) {
      current.textContent = `0${slideInd}`
    } else {
      current.textContent = slideInd
    }

    dots.forEach((dot) => (dot.style.opacity = "0.5"))
    dots[slideInd - 1].style.opacity = 1
  })
}
export default slider

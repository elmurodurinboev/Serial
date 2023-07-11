function clas() {
  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...rest) {
      this.src = src
      this.alt = alt
      this.descr = descr
      this.title = title
      this.price = price
      this.parent = document.querySelector(parentSelector)
      this.classes = rest
      this.usdUzs = 11000
      this.changeUzs()
    }

    changeUzs() {
      this.price = this.price * this.usdUzs
    }

    render() {
      const element = document.createElement("div")
      if (this.classes.length === 0) {
        element.classList.add("menu__item")
      } else {
        this.classes.forEach((item) => {
          element.classList.add(item)
        })
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
            `
      this.parent.append(element)
    }
  }

  // AXIOS - kutubxonasi bilan ishlash. Bu bizga object qaytaradi va uning ichidagi data kalit so'zi orqali serverdan kelgan datalarni olishimiz mumkin!
  axios.get("http://localhost:3000/menu").then((data) => {
    // console.log(data);
    data.data.forEach(({ img, alt, title, desc, price }) => {
      new MenuCard(img, alt, title, desc, price, ".menu .container").render()
    })
  })
}

export default clas

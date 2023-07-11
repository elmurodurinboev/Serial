function tab(tabSelector, contentSelector, tabParentSelector, active) {
  const tabParent = document.querySelector(tabParentSelector),
    tabs = document.querySelectorAll(tabSelector),
    tabContent = document.querySelectorAll(contentSelector)

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide", "fade")
    })
    tabs.forEach((item) => {
      item.classList.remove(active)
    })
  }
  hideTabContent()

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade")
    tabContent[i].classList.remove("hide")
    tabs[i].classList.add(active)
  }

  showTabContent()

  tabParent.addEventListener("click", (event) => {
    const target = event.target
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, inx) => {
        if (item == target) {
          hideTabContent()
          showTabContent(inx)
        }
      })
    }
  })
}
export default tab

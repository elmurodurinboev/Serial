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
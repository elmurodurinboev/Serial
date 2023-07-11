import { openModal, closeModal } from "./modal"
import { postData } from "../server/server"
function form(formSelector, modalTimerId) {
  // Forms
  const msg = {
    load: "Loading",
    success: "Thank's for submitting our form!",
    failure: "Oops!. Somthing went wrong!",
  }

  const forms = document.querySelectorAll(formSelector)

  forms.forEach((form) => {
    bindPostDate(form)
  })

  function bindPostDate(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault() //Brauzerni default qiymatini o'chiradi

      const statusMessage = document.createElement("div")
      statusMessage.textContent = msg.load
      statusMessage.style.textAlign = "center"
      form.append(statusMessage)

      const formData = new FormData(form)

      form.insertAdjacentElement("afterend", statusMessage)
      //                   (objectga o'girish metodi) (massivga o'girish metodi)
      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data)
          showThanksModal(msg.success)
          statusMessage.remove()
        })
        .catch(() => {
          showThanksModal(msg.failure)
        })
        .finally(() => {
          form.reset()
        })

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
    })
  }

  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog")
    prevModal.classList.add("hide")
    openModal(".modal", modalTimerId)
    const showModal = document.createElement("div")
    showModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">
                  ${message}
                </div>
            </div>
        `

    document.querySelector(".modal").append(showModal)
    setTimeout(() => {
      showModal.remove()
      prevModal.classList.add("show")
      prevModal.classList.remove("hide")
      closeModal(".modal")
    }, 4000)
  }
}

export default form

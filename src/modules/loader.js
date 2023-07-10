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
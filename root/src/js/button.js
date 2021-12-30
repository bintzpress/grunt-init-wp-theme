const button = document.querySelector(".testButton");
const popup = document.querySelector(".popup");

function togglePopup() {
  if (popup.style.display == "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }  
}

button.addEventListener("click", togglePopup);


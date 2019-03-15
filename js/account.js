const sidepanel_control = document.getElementById("sidepanel-control");
const sidepanel  = document.getElementById("sidepanel");

sidepanel_control.addEventListener('click', ()=>{
if(sidepanel.style.display === "none" ){
    sidepanel.style.display = "inline-block";
} else{
    sidepanel.style.display = "none";
}
})

// code for modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
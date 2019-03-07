const sidepanel_control = document.getElementById("sidepanel-control");
const sidepanel  = document.getElementById("sidepanel");

sidepanel_control.addEventListener('click', ()=>{
if(sidepanel.style.display === "none" ){
    sidepanel.style.display = "inline-block";
} else{
    sidepanel.style.display = "none";
}
})
const menuO = document.getElementById('openNav') 
menuO.addEventListener('click', async () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById('kk').style.marginLeft = "260px"

})

const menuC = document.getElementById('closebtn') 

menuC.addEventListener('click', async () => {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById('kk').style.marginLeft = "60px"
})

document.querySelectorAll('.swapPage').forEach(item => {
  item.addEventListener('click', event => {
    document.getElementById("mySidenav").style.width = "0px";
  });
});

setInterval(function(){
  location.reload();
}, 15000);
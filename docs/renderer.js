const menuO = document.getElementById('openNav') 
menuO.addEventListener('click', async () => {
  document.getElementById("mySidenav").style.width = "250px";
})

const menuC = document.getElementById('closebtn') 
menuC.addEventListener('click', async () => {
  document.getElementById("mySidenav").style.width = "0px";
})

document.querySelectorAll('.swapPage').forEach(item => {
  item.addEventListener('click', event => {
    document.getElementById("mySidenav").style.width = "0px";
  });
});





const download = document.getElementById('download')
const jsonpar = document.getElementById('jsonpar')
const maps = document.getElementById('maps')
const login = document.getElementById('login')

const graph0 = document.getElementById('gResp0')
const graph1 = document.getElementById('gResp1')
const graph2 = document.getElementById('gResp')

const windows = [login, jsonpar, graph0, graph1, graph2, maps, spacer, download]  //div sectors by id
var prevCh = 0
function swapPage(sh){

  for (let i = 0; i < windows.length; i++) { 
    windows[i].style.display = "none";
  }
  windows[sh].style.display = "block";


  const dp = document.querySelectorAll('.swapPage')[prevCh];
  dp.style.backgroundColor = ""
  dp.addEventListener('mouseover', mouseOverHandler(dp));
  dp.addEventListener('mouseout', mouseOutHandler(dp));

  const dps = document.querySelectorAll('.swapPageS')[prevCh];
  dps.style.backgroundColor = "white"
  dps.addEventListener('mouseover', mouseOverHandler(dps));
  dps.addEventListener('mouseout', mouseOutHandler(dps));

  prevCh = sh
  document.querySelectorAll('.swapPage')[sh].style.backgroundColor = "#383644"
  document.querySelectorAll('.swapPageS')[sh].style.backgroundColor = "#383644"

  function mouseOverHandler(prev) {
    prev.style.color = "#7f7e7e";
    prev.style.backgroundColor = "#7f7e7e";
  }
  
  function mouseOutHandler(prev) {
    prev.style.color = '';
    prev.style.backgroundColor = "";
  }

}
window.api.send("toMainSettings")//načítá nastavení a všechna data
window.api.receive("fromMainSettings", (sett) => {
  if (sett.dev){
    document.getElementById("username").value = "aa"
    document.getElementById("password").value = "aa";
    document.getElementById("ipAddress").value = "https://192.168.1.110:8000";
    document.getElementById("hider").style.width = "0px";
  }
})


//hide swap:
const graph = document.getElementById('graf')
const jsonpar = document.getElementById('jsonpar')
const maps = document.getElementById('maps')
const login = document.getElementById('login')

const graph0 = document.getElementById('gResp0')
const graph1 = document.getElementById('gResp1')
const graph2 = document.getElementById('gResp')
const spacer = document.getElementById('spacer')

const windows = [login, jsonpar, graph0, graph1, graph2, maps, spacer, graph]  //div sectors by id
var prevCh = 0
function swapPage(sh){

  if (sh!=0){
    document.getElementById("hider").style.width = "0px";
  }

  for (let i = 0; i < windows.length; i++) { 
    windows[i].style.display = "none";
  }
  windows[sh].style.display = "block";
  if (sh!=0 && sh!=1 && sh!=5)
  {
    windows[7].style.display = "block";
  }
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



swapPage(0)

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
   
    swapPage(parseInt(item.id[1]));
    document.getElementById("mySidenav").style.width = "0px";
    map.invalidateSize();//překreslení mapy pro korektní zobrazení
    
  });
});

document.querySelectorAll('.swapPageS').forEach(item => {
  item.addEventListener('click', event => {
   
    swapPage(parseInt(item.id[1]));
    document.getElementById("mySidenav").style.width = "0px";
    map.invalidateSize();//překreslení mapy pro korektní zobrazení
    
  });
});




const b11 = document.getElementById('validateLogIn')
b11.addEventListener('click', async () => {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var ipAddress = document.getElementById("ipAddress").value;


    window.api.httpRequest("requestServerUp", [username, password, ipAddress])
    window.api.receive("fromMainSuccessfulLogin", (data) => {//ošetření jestli server běží a uživ je přihlášen?
      if(data==true){
        alert("Login successful!");
        
        load_server_json()// load table data
        loadTableData()//graphs reload
        updateMapPoints()//map data reload

        swapPage(1)
      }
      else if(data=="ECONNREFUSED"){
        if (!confirm(data+"\n OK: for reconect\nCancel: For close app")){
          window.api.send("toMainServerDown")
        }
      }
      else if(data=="ERR_BAD_REQUEST"){
        alert("Bad PSWD or NAME")
      }
      
  });

})

//logs from main

window.api.receive_cmd("fromMainRequestLog",(data)=>{
  console.log("%c"+data[0] +" "+ data[1],data[1]!=200?'color:red':'color:cyan')
  if (data[1]==401){
    swapPage(0);
    document.getElementById("hider").style.width = "50px";
    alert("Time out!");
  }
  else if (data[1]!=200)
  {
    swapPage(0);
    document.getElementById("hider").style.width = "50px";
    alert("Not connected network error!");
  }
})

const hider = document.getElementById('hider')
hider.addEventListener("click", async () => {
  alert("Not logged in! \nOr not conected.");
})

const version = document.getElementById('version')
document.addEventListener("DOMContentLoaded", function(){
  window.api.send("toMainUpdateMessage", "")
  window.api.receive_cmd("fromMainUpdateMessage",(data)=>{
    version.innerHTML = data
  })
})





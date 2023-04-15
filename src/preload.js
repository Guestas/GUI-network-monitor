const {
    contextBridge,
    ipcRenderer
} = require("electron");
//
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
    openFile: () => ipcRenderer.invoke('openFiledial'),  //open dialog file
    send: (channel, data) => {  //render to main activate fnc in main with data from face
        /*
            function:
                "toMainJsonLoad" - load data from local json file
                "toMainJsonSave" - save updated local json file
                "toMainSettings" - load saved settings
                "toMainServerDown" - user response for server down for close app
                "toMainUpdateMessage" - message about version of app

                
        */
        // whitelist channels
        let validChannels = ["toMainJsonLoad","toMainJsonSave", "toMainSettings", "toMainServerDown", "toMainServerUp", "toMainUpdateMessage"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
            console.log("%c  -" + channel +  " send", 'color:green')//transfer log
        }
        else {console.log("%c  -" + channel + " is not in whitelist of send", 'color:red')}
    },
    receive: (channel, func) => {//main to render and face listen for it if it is important for. It send just onece
        /*
            function:
                "fromMainJsonLoad" - loaded data from json task properties
                "fromMainRequestLoadAll" - requested data -all responses
                "fromMainRequestTaskProperties" - requested data -properties of tasks
                "fromMainRequestTaskAverage" - requested data -average of tasks
                "fromMainRequestLoadFromTime" - requested data -responses from time
                "fromMainSettings" - requested data -loaded data from json settings
                "fromMainSuccessfulLogin" - message server is online and runing
                "fromMainServerDown" - message server is online and runing

        */
        let validChannels = ["fromMainJsonLoad","fromMainRequestLoadAll", "fromMainRequestTaskProperties","fromMainRequestTaskAverage", "fromMainRequestLoadFromTime", "fromMainSettings", "fromMainSuccessfulLogin", "fromMainServerDown", "fromMainUpdateMessage"];
        console.log("%c  -" + channel + " recieve", 'color:green')  //transfer log
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
        else {console.log("%c  -" + channel + " is not in whitelist of recieve", 'color:red')}
    },
    receive_cmd: (channel, func) => {//main to render and face listen for it if it is important for it seted for walue and stay on it
        /*
            function:
                "fromMainhowHideSwitch" - switch betwen windows
                "fromMainRequestLog" - requested data -log from transfer
                "fromMainUpdateMessage" - message about version of app
        */
        // whitelist channels
        let validChannels = ["fromMainhowHideSwitch", "fromMainRequestLog", "fromMainUpdateMessage"];
        console.log("%c  -" + channel + " recieve_cmd", 'color:green')  //transfer log
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
        else {console.log("%c  -" + channel + " is not in whitelist of recieve_cmd", 'color:red')}
    },
    httpRequest: async(channel, reqValues)=>{
        /*
            function:
                "requestLoadAll" - request -all responses
                "requestAddTask" - request -add task
                "requestDelTask" - request -delete task
                "requestClearAllDatabase" - request -delete all database data
                "requestUpdateTask" - request -update tsk properties
                "requestPauseStartTask" - request -pause or start task depends on actual case
                "requestTasksProperties" - request -properties from server
                "requestTasksAverage" - request -average times
                "requestLoadAllFromTime" - request -responses from time
                "requestServerUp" - message server is online and runing
                "requestHideTask" - request -hide task in graphs
        */
        let validChannels = ["requestLoadAll","requestAddTask", "requestDelTask", "requestClearAllDatabase","requestUpdateTask","requestPauseStartTask","requestTasksProperties","requestTasksAverage", "requestLoadAllFromTime", "requestServerUp", "requestHideTask"];
        console.log("%c  -" + channel + " html request send", 'color:green')  //transfer log
        if (validChannels.includes(channel)) {

            await ipcRenderer.invoke(channel,reqValues)
        }
        else {console.log("%c  -" + channel + " is not in whitelist of recieve", 'color:red')}
    },
});

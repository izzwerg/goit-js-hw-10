import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as o,i as r}from"./assets/vendor-651d7991.js";const a=document.querySelector("#datetime-picker"),n=document.querySelector("button[data-start]");document.querySelector("button[data-days]");document.querySelector("button[data-hours]");document.querySelector("button[data-minutes]");document.querySelector("button[data-seconds]");console.log(n);let e="";function c(){e.getTime()<Date.now()&&r.show({position:"topRight",messageColor:"white",iconUrl:"error.svg",iconColor:"white",color:"#EF4040",message:"Please choose a date in the future"})}o(a,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){e=t[0],console.log(e),c()}});
//# sourceMappingURL=commonHelpers.js.map

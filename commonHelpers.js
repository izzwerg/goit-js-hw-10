import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as a,i as r}from"./assets/vendor-651d7991.js";const t=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]");document.querySelector("button[data-days]");document.querySelector("button[data-hours]");document.querySelector("button[data-minutes]");document.querySelector("button[data-seconds]");let i="";function o(){t.classList.add("is-disable"),t.setAttribute("disabled",""),e.removeEventListener("click",o),e.classList.remove("is-active")}function c(){i.getTime()<Date.now()?(r.show({position:"topRight",messageColor:"white",iconUrl:"error.svg",iconColor:"white",color:"#EF4040",message:"Please choose a date in the future"}),e.removeEventListener("click",o),e.classList.remove("is-active")):(e.addEventListener("click",o),e.classList.add("is-active"))}a(t,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(s){i=s[0],c()}});
//# sourceMappingURL=commonHelpers.js.map

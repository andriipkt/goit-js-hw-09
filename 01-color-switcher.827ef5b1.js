!function(){var t,a=document.body,e=document.querySelector("[data-start]"),c=document.querySelector("[data-stop]");function d(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));a.style.backgroundColor=t}e.addEventListener("click",(function(){e.classList.add("active"),c.classList.remove("active"),e.disabled=!0,c.disabled=!1,t=setInterval(d,1e3)})),c.addEventListener("click",(function(){c.classList.add("active"),e.classList.remove("active"),c.disabled=!0,e.disabled=!1,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.827ef5b1.js.map
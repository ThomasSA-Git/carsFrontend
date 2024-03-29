import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import { initCars } from "./pages/cars/cars.js"
import { initMembers } from "./pages/members/members.js"
import { initReservations } from "./pages/reservations/reservations.js"
import { initFindCar } from "./pages/cars/findcar.js"
import { initaddcar } from "./pages/cars/addcar.js"
import {initLogin, initLogout} from "./pages/login/login.js"
import { initFindMember } from "./pages/members/findmember.js"

//starts the loading when the program is started
window.addEventListener("load", async () => {
//Loads html templates
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateMembers = await loadTemplate("./pages/members/members.html")
  const templateCars = await loadTemplate("./pages/cars/cars.html")
  const templateFindCar = await loadTemplate("./pages/cars/findcar.html")
  const templateaddcar = await loadTemplate("./pages/cars/addcar.html")
  const templateReservations = await loadTemplate("./pages/reservations/reservations.html")
  const templateFindMember = await loadTemplate("./pages/members/findmember.html")
  //const templateLogin = await loadTemplate(".pages/login/login.html")
  

  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")
  initLogin()
  initLogout()

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router
 

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML =
        `<div class="container">
        <h2>Home</h2>
      <p style='margin-top:2em'>
      Welcome to my cars app <br>
      Choose different functions on navbar. <br>
      Site still under construction
      <br>
      <img display: inline-block; src="./carpicture.jpg" alt="" width="481" height="320">
      </p>
      </div>
     `,
      "/about": () => renderTemplate(templateAbout, "content"),

      "/cars": () => {
        renderTemplate(templateCars, "content")
        initCars()
      },
      "/members": () => {
        renderTemplate(templateMembers, "content")
        initMembers()
      },
      "/find-car": () => {
        renderTemplate(templateFindCar, "content")
        initFindCar()
      },
      "/add-car": () => {
        renderTemplate(templateaddcar, "content")
        initaddcar()
      },
      "/reservations": () => {
        renderTemplate(templateReservations, "content")
        initReservations()
      },
      "/findmember": () => {
        renderTemplate(templateFindMember, "content")
        initFindMember()
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}
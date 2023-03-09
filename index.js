import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import { initCars } from "./pages/cars/cars.js"
import { initMembers } from "./pages/members/members.js"
import { initReservations } from "./pages/reservations/reservations.js"
import { initFindCar } from "./pages/cars/findcar.js"

//starts the loading when the program is started
window.addEventListener("load", async () => {
//Loads html templates
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateMembers = await loadTemplate("./pages/members/members.html")
  const templateCars = await loadTemplate("./pages/cars/cars.html")
  const templateFindCar = await loadTemplate("./pages/cars/findcar.html")
  const templateReservations = await loadTemplate("./pages/reservations/reservations.html")

  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")


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
        `<h2>Cars</h2>
      <p style='margin-top:2em'>
      Welcome to my cars app <br/>
      Choose different functions on navbar. Site still under construction
      </p>
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

      "/navigate-programatically": () => {
        renderTemplate(templateReservations, "content")
        initReservations()
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
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"
import {API_URL} from "../../settings.js"
const URLcar = API_URL + "/cars"

export async function initFindCar() {
   const btnSingleCar = document.getElementById("find-car")
btnSingleCar.onclick = getCar
 
    }

    async function getCar(){
      const id = document.getElementById("text-for-id").value
      document.getElementById("error").innerText = ""

      const options = {
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token")}
      }  

  try{
      const carFound = await fetch(URLcar+"/"+id, options)
         .then(handleHttpErrors)
         const car = `<h3 style="margin-top: 5ex;">Car details</h3><li>Brand: ${carFound.brand}</li>
         <li>Model: ${carFound.model}</li>
         <li>Price pr day: ${carFound.pricePrDay}</li>`
         const okRows = sanitizeStringWithTableRows(car)
          document.getElementById("fill-list").innerHTML = okRows

          /* document.getElementById("c-id").innerText = "ID: " + carFound.id
          document.getElementById("c-brand").innerText = "Brand: " + carFound.brand
          document.getElementById("c-pricePrDay").innerText = "PricePrDay: " + carFound.pricePrDay */
         }
         catch(err){
          console.log(err.message)
          document.getElementById("error").innerText = err.message
        }
        
      }
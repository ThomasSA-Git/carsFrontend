import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js"
import {API_URL} from "../../settings.js"

const URLcar = API_URL + "/cars"

export async function initCars() {
  getAllCars()

  }
  
  async function getAllCars(){
try{
  document.getElementById("error").innerText = ""
  const options = {
    method: "GET",
    headers: { "Authorization": "Bearer " + localStorage.getItem("token")}
  }  
  
  const cars = await fetch(URLcar, options)
    .then(handleHttpErrors)
    console.log(cars)
    const tableRows = cars.map(car => 
      `<tr>
      <td>${car.id}</td>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.pricePrDay}</td>
    </tr>`).join("")
    const okRows = sanitizeStringWithTableRows(tableRows)
    document.getElementById("tbl-body").innerHTML = okRows
  } catch (err) {
    //Like this if you only need the "message"
console.log(err.message)
document.getElementById("error").innerText = err.message
    //Like this if you need all properties from the error response

  }


  
    }
    
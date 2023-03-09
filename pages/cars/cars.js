import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js"

const URLcar = "http://localhost:9090/api/cars"

export async function initCars() {
  getAllCars()

  }
  
  async function getAllCars(){
try{
    const car = await fetch(URLcar)
    .then(handleHttpErrors)
    console.log(car)
    const tableRows = car.map(car => 
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
    //Like this if you need all properties from the error response

  }


  
    }
    
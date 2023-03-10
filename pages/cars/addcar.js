import {handleHttpErrors} from "../../utils.js"

const URLcar = "http://localhost:9090/api/cars"

export async function initaddcar(){
    const btnAddCar = document.getElementById("add-car")
    btnAddCar.onclick = prepData

}

function prepData(){
    const brand = document.getElementById("input-brand").value
    const model = document.getElementById("input-model").value
    const price = document.getElementById("input-price").value
    const discount = document.getElementById("input-discount").value

const postData = {
  brand: brand,
  model: model,
  pricePrDay: price,
  bestDiscount: discount
};
postCar(postData)
}

async function postCar(data){


try{
    const car = await fetch(URLcar, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
    .then(handleHttpErrors)
    console.log(car)
  document.getElementById("succes-add").innerText = car.brand + " "+ car.model +" has been add to list"
  } catch (err) {
    //Like this if you only need the "message"
console.log(err.message)
    //Like this if you need all properties from the error response

  }
 
}
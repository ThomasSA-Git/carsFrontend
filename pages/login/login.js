
import {API_URL} from "../../settings.js"
import {handleHttpErrors} from "../../utils.js"

const URL = "http://localhost:9090/api/auth/login"

export function initLogin(){

    document.getElementById("login-btn").onclick = login
}

export function initLogout(){
    document.getElementById("logout-btn").onclick = logout
}

function logout(){
    document.getElementById("logout-btn").style.display = "none"
    document.getElementById("input-fields").style.display = "block"
    document.getElementById("login-btn").style.display = "block"
    localStorage.clear()
    window.router.navigate("")
    document.getElementById("username-input").value = ""
    document.getElementById("password-input").value = ""
    document.getElementById("welcome-text").innerText = ""
}

async function login(evt){
    //Below resets errormessage
    //document.getElementById("errorspace").innerText = ""

    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }

    try{
    const response = await fetch(URL, options)
    .then(handleHttpErrors)
    
    localStorage.setItem('username', response.username);
    localStorage.setItem('token', response.token);
    localStorage.setItem('roles', JSON.stringify(response.roles));

    document.getElementById("login-btn").style.display = "none"
    document.getElementById("input-fields").style.display = "none"
    document.getElementById("logout-btn").style.display = "block"
    document.getElementById("welcome-text").innerText = "Welcome " + response.username

    window.router.navigate("")
}
  catch(err){
    document.getElementById("content").innerText = err.message
  }
}
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"
import {API_URL} from "../../settings.js"
const URLmember = API_URL + "/members"

export async function initFindMember() {
   const btnSingleMember = document.getElementById("find-member")
btnSingleMember.onclick = getMember
 
    }

    async function getMember(){
      const id = document.getElementById("text-for-id").value
      document.getElementById("error").innerText = ""

      const options = {
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token")}
      }  

  try{
      const memberFound = await fetch(URLmember+"/"+id, options)
         .then(handleHttpErrors)
         const member = `<h3 style="margin-top: 5ex;">Car details</h3><li>Username: ${memberFound.username}</li>
         <li>Name: ${memberFound.firstName} ${memberFound.lastName}</li>
         <li>E-mail: ${memberFound.email}</li>`
         okRows = sanitizeStringWithTableRows(member)
          document.getElementById("fill-list").innerHTML = okRows


         }
         catch(err){
          console.log(err.message)
          document.getElementById("error").innerText = err.message
        }
        
      }
import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js"

const URLmembers = "http://localhost:9090/api/members"

export async function initMembers() {
  document.getElementById("tbl-body").onclick = showMemberDetails
getAllMembers()
}


  
  async function getAllMembers(){
try{
    const members = await fetch(URLmembers)
    .then(handleHttpErrors)
    console.log(members)
    const tableRows = members.map(member => 
      `<tr>
      <td>${member.username}</td>
      <td>${member.firstName}</td>
      <td>${member.lastName}</td>
      <td>${member.email}</td>
      <td><button id="row-btn_details_${member.id}" type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Details</button> 
      </td>  
    </tr>`).join("")
    const okRows = sanitizeStringWithTableRows(tableRows)
    document.getElementById("tbl-body").innerHTML = okRows
  } catch (err) {
    //Like this if you only need the "message"
console.log(err.message)
    //Like this if you need all properties from the error response

  }
    }


    //skal fixes. Søger på numerisk id, men api i backend finder members på username
    async function showMemberDetails(evt) {
      const target = evt.target
      if (!target.id.startsWith("row-btn_")) {
        return
      }
      
      const parts = target.id.split("_");
      const id = parts[2]
      const btnAction = parts[1]
        if (btnAction === "details") {
         document.getElementById("exampleModalLongTitle").innerText = "Details for member: "+id
         const member = await fetch(URLmembers + "/" + username).then(res => res.json())
      document.getElementById("modal-body").innerText = JSON.stringify(member)
         
        } 
        else 
        if (btnAction === "delete")  {
            alert("Here you can DELETE member with username: " + username )
        }
  
        
    }
    
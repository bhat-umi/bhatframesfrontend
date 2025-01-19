import baseUrl from "../main.js";

import { setAuthToken,getAuthToken,removeAuthToken } from "../main.js";

const loginButton=document.querySelector("#loginbutton");
loginButton.addEventListener("click",(e)=>{
    login();
   // window.location.href="./home.html"
})
console.log(baseUrl)
const login=()=>{
    const loginForm= document.querySelector("#loginform");
    loginForm.classList.add("was-validated");
    if(!loginForm.checkValidity())
    {
        console.log("canceled")
        return;
    }
    const formData= new FormData(loginForm);

    const empid=formData.get("empid"); 
    const password=formData.get("password"); 
    console.log(empid,password);
    const url=`${baseUrl}/login`
    const data={
       emp_id: empid,
        password
    }
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)

    })
    .then(response => {
        
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  
      })
    .then((res)=>
{
    setAuthToken("acasfsa");

    console.log(res);
})
.catch((res)=>{
    document.querySelector("#error-message").classList.add("alert-danger")
    document.querySelector("#error-message").classList.remove("alert-info")
    document.querySelector("#error-message").textContent="Invalid Empid or password"
    console.log(res);
})


}

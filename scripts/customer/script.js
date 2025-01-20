import baseUrl, { fetchEmployeeDetail, getToken } from "../main.js";
fetchEmployeeDetail();
const customers=[
    {
    id:1,
    fname: "Asif",
    lname:"ali",
    phone: "1234567890",
    balance: 3000,
    address:"pampore",
    title:'Mr'
    },
    {
        id:2,
        fname: "Mohd",
        lname:'Youis',
        phone: "1234567890",
        balance: 6700,
        address:"pampore",
        title:'Ms'
    },

]



const cardContainer = document.getElementById("card-container");

// Function to create a card
function createCustomerCard(data) {
   let name=data.fname+" "+data.lname;
   let phone=data.phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");

    

    // Create card element
    const card = document.createElement("div");
    card.className = "card shadow-sm border-0";
    card.style.width = "100%";
    card.style.backgroundColor = "#f8f9fa";

    // Create card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Header Row
    const headerRow = document.createElement("div");
    headerRow.className = "row align-items-between mb-3";

    const headerLeft = document.createElement("div");
    headerLeft.className = "col-8 card-subtitle text-primary fw-bold text-start  ";
    headerLeft.innerHTML = `<i class="bi bi-person-circle me-2"></i> ${name} (${phone})`;

    const headerRight = document.createElement("div");
    headerRight.className = "col-4 text-end text-danger fw-bold";
    headerRight.innerHTML = `<i class="bi bi-wallet2 me-2"></i> Balance: ₹${data.balance.toLocaleString()}`;

    headerRow.appendChild(headerLeft);
    headerRow.appendChild(headerRight);

    // Buttons Row
    const buttonsRow = document.createElement("div");
    buttonsRow.className = "d-flex justify-content-between mt-3";

    // View Button
    const viewButton = document.createElement("button");
    viewButton.className = "btn btn-outline-primary btn-sm";
    viewButton.setAttribute("data-bs-toggle","modal");
    viewButton.setAttribute("data-bs-target","#customermodal");
    ///adding data on this button
    viewButton.setAttribute("data-fname",data.fname);
    viewButton.setAttribute("data-lname",data.lname);
    viewButton.setAttribute("data-address",data.address);
    viewButton.setAttribute("data-contact",data.phone);
    viewButton.setAttribute("data-title",data.title);
    viewButton.setAttribute("data-id",data.id);
    viewButton.setAttribute("data-balance",data.balance);
    viewButton.setAttribute("data-action","Update");

    viewButton.innerHTML = `<i class="bi bi-pencil-square me-1"></i> Update`;
    buttonsRow.appendChild(viewButton);

    // Call Button
    const callButton = document.createElement("a");
    callButton.className = "btn btn-outline-warning btn-sm";
    callButton.href = `tel:${data.phone}`; // Removes dashes from the phone number
    callButton.innerHTML = `<i class="bi bi-telephone me-1"></i> Call`;
    buttonsRow.appendChild(callButton);

    // Payments Button
    const paymentsButton = document.createElement("button");
    paymentsButton.className = "btn btn-outline-success btn-sm";
    paymentsButton.innerHTML = `<i class="bi bi-cash-stack me-1"></i> Payments`;
    buttonsRow.appendChild(paymentsButton);

    // Assemble the card
    cardBody.appendChild(headerRow);
    cardBody.appendChild(buttonsRow);
    card.appendChild(cardBody);

    // Insert the card into the container
    cardContainer.appendChild(card);
}

// Check if customer data is available and display accordingly
if (customers) {
    cardContainer.innerHTML = "";
    customers.forEach((customerData)=>
    createCustomerCard(customerData)
    );
} else {
    cardContainer.textContent = "Customers will appear here";
}


const saveCustomerButton=document.querySelector("#saveCustomer");
const saveCustomer=(e)=>{
let customerForm=document.querySelector("#customerForm");
let formdata=new FormData(customerForm);
customerForm.classList.add("was-validated");
    if(!customerForm.checkValidity())
    {
        console.log("canceled save")
        //return;
    }
    let tempInnerHtml=saveCustomerButton.innerHTML;
    saveCustomerButton.classList.add("disabled");
    saveCustomerButton.innerHTML=`<div class="spinner-border spinner-border-sm" ></div> Saving`
    //prepare data
    let data={
        id:formdata.get('id'),
        title:formdata.get('title'),        
        fname:formdata.get('fname'),
        lname:formdata.get('lname'),
        contact:formdata.get('contact'),
        address:formdata.get('address'),
        balance:formdata.get('balance'),

    }
    const token = getToken('access_token')
    let url=`${baseUrl}/customers/create`
    fetch(url,{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body:JSON.stringify(data)
    }).then((res)=>{
        throw new Error("efe")
    }).catch(res=>{

    saveCustomerButton.innerHTML=tempInnerHtml;
    saveCustomerButton.classList.remove("disabled");
    })
    console.log(data)
}
saveCustomerButton.addEventListener("click",saveCustomer)


const customerModal=document.querySelector("#customermodal")
customerModal.addEventListener("show.bs.modal",(e)=>{
    let targetButton=e.relatedTarget;
    let fname=targetButton.getAttribute("data-fname");
    let lname=targetButton.getAttribute("data-lname");
    let address=targetButton.getAttribute("data-address");
    let contact=targetButton.getAttribute("data-contact");
    let balance=targetButton.getAttribute("data-balance");
    let title=targetButton.getAttribute("data-title");
    let id=targetButton.getAttribute("data-id");
    let action=targetButton.getAttribute("data-action");

    customerModal.querySelector('#fname').value=fname;
    customerModal.querySelector('#lname').value=lname;
    customerModal.querySelector('#address').value=address;
    customerModal.querySelector('#contact').value=contact;
    customerModal.querySelector('#balance').value=balance;
    customerModal.querySelector('#id').value=id;
    customerModal.querySelector('#title').value=title
    customerModal.querySelector('#action').textContent=action+" Customer";
    




    console.log(targetButton.getAttribute("data-fname"));
   // customerModal.querySelector("fname").value=targetButton.get
    
})
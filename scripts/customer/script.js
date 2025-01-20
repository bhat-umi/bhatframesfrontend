import baseUrl, { fetchEmployeeDetail, getToken } from "../main.js";
fetchEmployeeDetail();
const customers=[
    {
    name: "Asif  ali",
    phone: "123-456-7890",
    balance: 3000
    },
    {
        name: "Mohd Youis",
        phone: "123-456-7890",
        balance: 6700
    },
    {
        name: "Fayaz Mir",
        phone: "123-456-7890",
        balance: 300
    },
    {
        name: "Adul",
        phone: "123-456-7890",
        balance:9000
    },

]



const cardContainer = document.getElementById("card-container");

// Function to create a card
function createCustomerCard(data) {
    // Clear existing content
    

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
    headerLeft.innerHTML = `<i class="bi bi-person-circle me-2"></i> ${data.name} (${data.phone})`;

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
    viewButton.innerHTML = `<i class="bi bi-eye me-1"></i> View`;
    buttonsRow.appendChild(viewButton);

    // Call Button
    const callButton = document.createElement("a");
    callButton.className = "btn btn-outline-warning btn-sm";
    callButton.href = `tel:${data.phone.replace(/-/g, "")}`; // Removes dashes from the phone number
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
        id:-1,
        title:formdata.get('title'),        
        fname:formdata.get('fname'),
        lname:formdata.get('lname'),
        contact:formdata.get('contact'),
        address:formdata.get('address'),
        balance:formdata.get('balance'),

    }
    const token = getToken('access_token')
    let url=`${baseUrl}/customers/save`
    fetch(url,{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body:JSON.stringify(data)
    }).then()
    console.log(data)
}
saveCustomerButton.addEventListener("click",saveCustomer)
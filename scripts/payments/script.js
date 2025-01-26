import baseUrl, { fetchEmployeeDetail } from "../main.js";
import { getToken } from "../main.js";
fetchEmployeeDetail();
const paymentDetails = [{
    personName: "Asif Ali",
    phoneNumber: "123-456-7890",
    amount: "3000",
    paymentDate: "20th Jan, 2025"
},
{
personName: "Three way",
phoneNumber: "123-456-7890",
amount: "9000",
paymentDate: "20th jul, 2025"
}
];
const cardContainer = document.getElementById("card-container");

function generatePaymentCard(paymentDetails) {
    // Extract details from the object
    const { personName, phoneNumber, amount, paymentDate } = paymentDetails;

    // Create the card div element
    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm', 'border-0');
    card.style.width = '100%';
    card.style.backgroundColor = 'rgb(248, 249, 250)';
    
    // Create the card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    // Create the first row with person info and amount
    const row1 = document.createElement('div');
    row1.classList.add('row', 'align-items-between', 'mb-3');
    
    // Person info column
    const col1 = document.createElement('div');
    col1.classList.add('col-8', 'card-subtitle', 'text-primary', 'fw-bold', 'text-start');
    col1.innerHTML = `<i class="bi bi-person-circle me-2"></i> ${personName} (${phoneNumber})`;
    
    // Amount column
    const col2 = document.createElement('div');
    col2.classList.add('col-4', 'text-end', 'text-danger', 'fw-bold');
    col2.innerHTML = `<i class="bi bi-cash-stack me-2"></i> Amount: ₹${amount}`;
    
    // Append columns to the first row
    row1.appendChild(col1);
    row1.appendChild(col2);
    
    // Create the second row for payment info
    const row2 = document.createElement('div');
    row2.classList.add('row');
    
    // Payment date column
    const col3 = document.createElement('div');
    col3.classList.add('col', 'text-start');
    col3.innerHTML = `<div class="fw-bold"><i class="bi bi-calendar me-2"></i><span class="d-none d-block-sm"> Date: </span><span>${paymentDate}</span></div>`;
    
    // More details button column
    const col4 = document.createElement('div');
    col4.classList.add('col', 'text-end');
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.innerHTML = '<i class="bi bi-info-circle me-1"></i> More Details';
    col4.appendChild(button);
    
    // Append columns to the second row
    row2.appendChild(col3);
    row2.appendChild(col4);
    
    // Append rows to the card body
    cardBody.appendChild(row1);
    cardBody.appendChild(row2);
    
    // Append the card body to the card
    card.appendChild(cardBody);
    
    // Find the card-container and append the card to it
    const cardContainer = document.getElementById('card-container');
    cardContainer.appendChild(card);
}

if (paymentDetails) {
    cardContainer.innerHTML = "";
    paymentDetails.forEach(( payment)=>
        generatePaymentCard( payment)
    );
} else {
    cardContainer.textContent = " payments will appear here";
}




// JavaScript for searching customers as user types
const customerInput = document.getElementById('payment-customer');
const customerList = document.getElementById('customer-list');

// Example customers, this should ideally come from a server-side API
const customers = [
    { name: 'Asif', phone: '123-456-7890' },
    { name: 'Three way', phone: '987-654-3210' },
    { name: 'Moile Hut', phone: '555-555-5555' }
];

customerInput.addEventListener('input', function() {
   fetchCustomers();

    
});

//Close the dropdown if clicked outside
document.addEventListener('click', function(event) {
    if (!customerInput.contains(event.target) && !customerList.contains(event.target)) {
        customerList.style.display = 'none';
    }
});



//fetch customers
let  fetchCustomers=()=>{
    let form=document.querySelector("#paymetForm")
    let formData= new FormData(form);
    const queryString = new URLSearchParams(formData).toString()
    let token=getToken("access_token");
    let url=`${baseUrl}/customers/search?limit=40&page=1&${queryString}`
    fetch(url,{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json(); // Parse the JSON data
  }).then(data=>{
    
    console.log(data)

    let customers=data.data.map(c=>{
        return {
            name:c.customer_first_name+" "+c.customer_last_name,
            phone:c.customer_contact.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3"),
            id:c['customer_id']
        }
    })
    
    customerList.innerHTML = ''; // Clear previous results

    if (customers.length > 0) {
        customerList.style.display = 'block';
        customers.forEach(customer => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${customer.name} (${customer.phone})`;
            li.onclick = function() {
                customerInput.value = customer.name; // Set selected customer name
                customerList.style.display = 'none'; // Hide the list
            };
            customerList.appendChild(li);
        });
    } else {
        customerList.style.display = 'none'; // Hide if no match
    }
    console.log(data)
  })
}


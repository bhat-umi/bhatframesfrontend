import { fetchEmployeeDetail } from "../main.js";
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
const baseUrl = "http://127.0.0.1:8000";
export default baseUrl;


export function setToken(name,token) {
    if (token) {
        
        localStorage.setItem(name, token); 
        console.log(`Token set successfully: ${token}`);
    } else {
        console.warn('No token provided');
    }
}

export function getToken(name) {
    const token = localStorage.getItem(name); 
    if (token) {
        console.log(`Token retrieved successfully: ${token}`);
        return token;
    } else {
        console.warn('No token found');
        return null;
    }
}



export function removeToken(name) {
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name); 
        console.log('Token removed successfully');
    } else {
        console.warn('No token found to remove');
    }
}

export function fetchEmployeeDetail()
{
    const url = `${baseUrl}/users/get_employee_name`;
    const token = getToken('access_token') ;

    fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        } 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let name=data['emp_name']
        console.log('Employee Details:', data);
        document.querySelector("#empusername").textContent=name;
    })
    .catch(error => {
        console.error('Error fetching employee details:', error)});
}

export function logOut()
{
    removeToken('access_token');
    removeToken('refresh_token');  
    console.log("logout done") 
    window.location.href="index.html";
}   
const logOutButton=document.querySelector("#logOutButton")

if(logOutButton)
{
    logOutButton.addEventListener("click",logOut)
}





///notifications
const showNotification=(message)=>
{
const scrollWrapper = document.createElement('div');
scrollWrapper.classList.add("navbar", "bg-warning");
 

// Add styles using JavaScript for scrolling effect
scrollWrapper.style.whiteSpace = 'nowrap'; // Prevent text from wrapping
scrollWrapper.style.overflow = 'hidden'; // Hide the overflow of the text
scrollWrapper.style.width = '100%'; // Make sure it takes full width

// Create a container for the scrolling text
const scrollText = document.createElement('strong');
scrollText.style.display = 'inline-block'; // Inline-block for the scrolling text
scrollText.innerText =message;
scrollText.style.transform="translateX(100%)"
// Apply animation to scroll text
scrollText.style.animation = 'scrollLeftToRight 10s 750ms linear';

// Create the keyframes for scrolling animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scrollLeftToRight {
    0% {
   
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
      
      
    }
  }
`;

// Append the style to the head
document.head.appendChild(style);

// Replace the inner content of the scrollWrapper with the scrollable text
scrollWrapper.innerHTML = '';
scrollWrapper.appendChild(scrollText);

// Insert the notification below the navbar
const navbar = document.querySelector('.navbar');
navbar.insertAdjacentElement('afterend', scrollWrapper);
setTimeout(()=>{
    scrollWrapper.classList.add("fade"); 
},9999)

}
showNotification( "Site Under Maintenance: We're adding new features, and some parts of the site might not work as expected. Thank you for your patience!")
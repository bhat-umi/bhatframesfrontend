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



export function removeToken() {
    if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken'); 
        console.log('Token removed successfully');
    } else {
        console.warn('No token found to remove');
    }
}

export function fetchEmployeeDetail()
{
    const url = `${baseUrl}/fetchDetails`;
    const token = getToken('access_token') ;

    fetch(url, {
        method: 'POST',
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
            console.log('Employee Details:', data);
    })
    .catch(error => {
        console.error('Error fetching employee details:', error)});
}

export function logOut()
{
    removeAuthToken();
    window.location.href="index.html";
}   
const logOutButton=document.querySelector("#logOutButton")

if(logOutButton)
{
    addEventListener("click",logOut)
}
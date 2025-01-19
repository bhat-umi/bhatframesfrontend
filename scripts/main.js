const baseUrl = "";
export default baseUrl;


export function setAuthToken(token) {
    if (token) {
        
        localStorage.setItem('authToken', token); 
        console.log(`Token set successfully: ${token}`);
    } else {
        console.warn('No token provided');
    }
}

export function getAuthToken() {
    const token = localStorage.getItem('authToken'); 
    if (token) {
        console.log(`Token retrieved successfully: ${token}`);
        return token;
    } else {
        console.warn('No token found');
        return null;
    }
}



export function removeAuthToken() {
    if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken'); 
        console.log('Token removed successfully');
    } else {
        console.warn('No token found to remove');
    }
}

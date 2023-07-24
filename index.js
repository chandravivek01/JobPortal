function saveCredentials() {

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

function validateCredentials() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = localStorage.getItem('username');
    const pass = localStorage.getItem('password');

    if(username===user && password===pass)
        window.location.href = "resume.html";
    else
        alert('invalid user');
}

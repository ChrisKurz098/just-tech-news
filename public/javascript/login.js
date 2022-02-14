async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
console.log(username, email, password);

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
               username: username,
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        //check response
        if (response.ok){
            console.log('success');
        } else {
            alert(response.statusText)
        }
    }
}

/////login handler/////
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();


    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        //check response
        if (response.ok){
            //if login is ok then go to dashboard
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
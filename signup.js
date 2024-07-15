

const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('¡CUIDADO! El usuario ya esta registado!')
    }

    Users.push({name: name, email: email, password: password})
    //Para saber que Usuaraio esta Logeado dentro de la Aplicacion
    localStorage.setItem('users', JSON.stringify(Users))
    //////
    alert('Registro de Usaurio Exitoso!')
    window.location.href = 'login.html'

})


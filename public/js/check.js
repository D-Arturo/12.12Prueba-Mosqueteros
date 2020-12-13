const botonLogin = document.querySelector('#botonLogin');
const userLogin = document.querySelector('#user');
const pass = document.querySelector('#password');
const infoUser = require('./data/infoDeUsuarios.json');
const errorLogin = document.querySelector('#errordata');


botonLogin.addEventListener('click', () => {

    for (const i of infoUser) {

        ((user==infoUser[i].user)&&(pass==infoUser[i].password))? res.redirect('/catalogo') : errorLogin.innerHTML = "Los datos con incorrectos";
        
    }
})
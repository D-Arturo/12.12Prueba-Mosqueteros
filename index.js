//Declaracion de paquetes o motores a utilizar en el proyecto
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

//Declaramos NAVBAR y le decimos que necesitamos la lista que hay dentro de listaDeBotonesNav.json 
//para que la imprima en el #each que esta en navigation.hbs
const navbar = require('./views/partials/atoms/navbar/listaDeBotonesNav.json');
const catLibros = require('./views/partials/atoms/libro/infoDeLibros.json');
const catAccesorios = require('./views/partials/atoms/accesorio/infoDeAccesorios.json');
const usuarios = require('./views/partials/atoms/login/infoDeUsuarios.json');

// No se muy bien lo que hace ????? parsea la cabecera de las request
app.use(express.urlencoded({
  extended: true
}));

//Declaramos los directorios de donde sacaremos nuestros parciales y layouts
app.engine( 'hbs', exphbs({
    //__dirname nos especifica la ruta absoluta del index y a partir de ahi le concatenamos
    //la ruta relativa de la carpeta
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    //Declaramos que las extensiones de Handlebars van a ser .hbs
    extname: 'hbs',
  })
);

//Le especificamos al motor de vistas que interprete los .hbs como vistas(frontal)
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  // Renderizamos especificando el template, en que layout queremos renderizar y
  // pasamos como parametro los .json que necesitemos 
  return res.render('loginTemplate',{layout:'loginLayout'});
  
});
// Controlador que administra el acceso a nuestro catalogo 
app.post('/login', (req,res) => {
  // Capturamos los campos que nos interesan del formulario por su NAME
  const user = req.body.user;
  const password= req.body.password;

  console.log(user,password);
  // Hacemos un bucle para barrer el .json y comparar usuario y contraseña con los
  // campos del formulario
  for(let i=0;i<usuarios.length;i++){
    // Comprobamos que coinciden
    if(user==usuarios[i].user && password==usuarios[i].password){
      // Si coinciden redireccionamos al catalogo
      return res.redirect('/catalogo');
    }
  }
  // Si no coinciden los mandamos otra vez a que rellenen el formulario
  return res.redirect('/error');
});


// Renderizamos el catalogo con los parametros que necesitamos en cada bucle
app.get('/catalogo', (req,res) =>{

  return res.render('catalogoTemplate', {
    layout: 'catalogoLayout',
    listanav: navbar,
    infoLibros: catLibros,
    infoAccesorios: catAccesorios
    
  });

});

app.get('/error', (req,res) =>{

  res.render('loginTemplate',{layout:'loginLayout',error:true});

})

// Usamos esta directiva para decirle que todo el contenido de esa carpeta es estatico y podemos
// hacer una ruta a ese contenido de manera normal
app.use(express.static('public'));

//Le especificamos el puerto en el que escucha
app.listen(3000);

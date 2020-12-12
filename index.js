//Declaracion de paquetes o motores a utilizar en el proyecto
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
//Declaramos NAVBAR y le decimos que necesitamos la lista que hay dentro de listaDeBotonesNav.json 
//para que la imprima en el #each que esta en navigation.hbs
const navbar = require("./data/listaDeBotonesNav.json");
const catLibros = require("./data/infoDeLibros.json");
const catAccesorios = require("./data/infoDeAccesorios.json");

//Declaramos los directorios de donde sacaremos nuestros parciales y layouts
app.engine(
  "hbs",
  exphbs({
    //__dirname nos especifica la ruta absoluta del index y a partir de ahi le concatenamos
    //la ruta relativa de la carpeta
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    //Declaramos que las extensiones de Handlebars van a ser .hbs
    extname: "hbs",
  })
);

//Le especificamos al motor de vistas que interprete los .hbs como vistas(frontal)
app.set("view engine", "hbs");

app.get("/", function (req, res) {
  // Renderizamos especificando el template, en que layout queremos renderizar y
  // pasamos como parametro los .json que necesitemos 
  res.render("catalogoTemplate", {
    layout: "catalogoLayout",
    listanav: navbar,
    infoLibros: catLibros,
    infoAccesorios: catAccesorios
    
  });
});

// Usamos esta directiva para decirle que todo el contenido de esa carpeta es estatico y podemos
// hacer una ruta a ese contenido de manera normal
app.use(express.static("public"));

//Le especificamos el puerto en el que escucha
app.listen(3000);

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda"
});

db.connect((err) => {
    if (err) {
        console.log("Error de conexión");
        return;
    }

    console.log("Base de datos conectada");
});

// EJERCICIO 2
app.get("/categorias", (req, res) => {

    const sql = "SELECT * FROM categorias";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener categorías"
            });
        }

        res.json(result);
    });

});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});

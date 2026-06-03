const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda"
});

db.connect((err) => {
    if (err) {
        console.log("Error de conexión:", err);
        return;
    }
    console.log("Base de datos conectada");
});

// EJERCICIO 1
app.post("/categorias", (req, res) => {

    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({
            mensaje: "Nombre y descripción son obligatorios"
        });
    }

    const sql = `
        INSERT INTO categorias(nombre, descripcion)
        VALUES (?, ?)
    `;

    db.query(sql, [nombre, descripcion], (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al registrar categoría",
                error: err.message
            });
        }

        res.status(201).json({
            mensaje: "Categoría registrada correctamente",
            id: result.insertId
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});

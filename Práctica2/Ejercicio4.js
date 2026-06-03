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
        console.log("Error al conectar");
        return;
    }

    console.log("Base de datos conectada");
});

/* EJERCICIO 4
   PATCH /categorias/:id */

app.patch("/categorias/:id", (req, res) => {

    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        UPDATE categorias
        SET nombre = ?,
            descripcion = ?,
            updatedAt = NOW()
        WHERE id = ?
    `;

    db.query(sql, [nombre, descripcion, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al actualizar categoría"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría actualizada correctamente"
        });

    });

});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});

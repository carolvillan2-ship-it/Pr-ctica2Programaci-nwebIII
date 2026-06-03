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

/* 
   EJERCICIO 5
   DELETE /categorias/:id
 */

app.delete("/categorias/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM categorias
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al eliminar categoría"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría eliminada correctamente"
        });

    });

});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});

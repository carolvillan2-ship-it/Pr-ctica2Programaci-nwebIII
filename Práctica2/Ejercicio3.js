app.get("/categorias/:id", (req, res) => {

    const { id } = req.params;

    const sqlCategoria = `
        SELECT *
        FROM categorias
        WHERE id = ?
    `;

    db.query(sqlCategoria, [id], (err, categoria) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al buscar categoría"
            });
        }

        if (categoria.length === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        const sqlProductos = `
            SELECT *
            FROM productos
            WHERE categoria_id = ?
        `;

        db.query(sqlProductos, [id], (err, productos) => {

            if (err) {
                return res.status(500).json({
                    mensaje: "Error al obtener productos"
                });
            }

            res.json({
                categoria: categoria[0],
                productos: productos
            });

        });

    });

});

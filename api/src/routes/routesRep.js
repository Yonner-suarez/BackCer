const { Router } = require("express");
const postRepuesto = require("../controllers/postRepuesto");
const getRepuestos = require("../controllers/getRepuestos");
const deleteRep = require("../controllers/deleteRep");

const RouterRep = Router();

//?Trae todos los repuestos
RouterRep.get("/", async (req, res) => {
  try {
    const todosRepuestos = await getRepuestos();
    res.status(200).json(todosRepuestos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//?Agrega un repuesto
RouterRep.post("/", async (req, res) => {
  const { nombre, imagen, precio, marca, marcaReps } = req.body;

  console.log(req.body);
  console.log(![nombre, imagen, precio, marca, marcaReps].every(Boolean));
  if (![nombre, imagen, precio, marca, marcaReps].every(Boolean)) {
    return res
      .status(404)
      .json({ message: "Faltan datos para hacer el proceso" });
  }

  try {
    const nuevoRepuesto = await postRepuesto({
      nombre,
      imagen,
      precio,
      marca,
      marcaReps,
    });
    console.log(nuevoRepuesto);
    res.status(200).json(nuevoRepuesto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

RouterRep.delete("/", async (req, res) => {
  const { nombre } = req.query;

  try {
    const deleteReps = await deleteRep(nombre);
    res.status(200).json(deleteReps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = RouterRep;

const { Router } = require("express");
const postMarcaReps = require("../controllers/postMarcaRep");
const getMarcasRep = require("../controllers/getMarcasRep");

const RouterMarcaRep = Router();

RouterMarcaRep.get("/", async (req, res) => {
  try {
    const todasMarcas = await getMarcasRep();
    res.status(200).json(todasMarcas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//?Agrega una marca de Repuestos

RouterMarcaRep.post("/", async (req, res) => {
  const { marcas } = req.body;

  try {
    const marcasReps = await postMarcaReps(marcas);

    res.status(200).json(marcasReps);
  } catch (error) {}
});

module.exports = RouterMarcaRep;

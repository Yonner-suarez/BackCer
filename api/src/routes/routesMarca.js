const { Router } = require("express");
const getMarcas = require("../controllers/getMarcas");
const postMarca = require("../controllers/postMarca");

const RouterMarca = Router();

RouterMarca.post("/", async (req, res) => {
  const { marcas } = req.body;
  try {
    const todasMarcas = await postMarca(marcas);
    res.status(200).json(todasMarcas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

RouterMarca.get("/", async (req, res) => {
  try {
    const todasMarcas = await getMarcas();
    res.status(200).json(todasMarcas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = RouterMarca;

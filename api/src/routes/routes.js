const { Router } = require("express");
const RouterMarca = require("./routesMarca");
const RouterMarcaRep = require("./routesMarcaRep");
const RouterRep = require("./routesRep");
const nodemailer = require("nodemailer");
const generarOrden = require("../controllers/generarOrden");
const confirmacionDePago = require("../controllers/confirmacionDePago");

const MyRouter = Router();

MyRouter.use("/repuesto", RouterRep);
MyRouter.use("/marca", RouterMarca);
MyRouter.use("/marcaRep", RouterMarcaRep);

//!genero la orden de pago
MyRouter.post("/ordenDePago", async (req, res) => {
  const producto = req.body;

  try {
    const ordenDePago = await generarOrden(producto);

    res.status(200).json(ordenDePago);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//?  ruta de la información del pago
MyRouter.post("/confirmacionDePago", async (req, res) => {
  const payment = req.query;

  try {
    const infoDePago = await confirmacionDePago(payment);

    res.status(200).json(infoDePago);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = MyRouter;

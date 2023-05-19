const { Router } = require("express");
const RouterMarca = require("./routesMarca");
const RouterMarcaRep = require("./routesMarcaRep");
const RouterRep = require("./routesRep");

const MyRouter = Router();

MyRouter.use("/repuesto", RouterRep);
MyRouter.use("/marca", RouterMarca);
MyRouter.use("/marcaRep", RouterMarcaRep);

module.exports = MyRouter;

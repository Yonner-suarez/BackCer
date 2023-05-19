const { Marca } = require("../db");

const getMarcas = async () => {
  try {
    const todasMarcas = await Marca.findAll();
    return todasMarcas;
  } catch (error) {
    return error;
  }
};
module.exports = getMarcas;

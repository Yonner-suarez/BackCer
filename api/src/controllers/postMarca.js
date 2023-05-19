const { Marca } = require("../db");

const postMarca = async (marcas) => {
  try {
    const marcasCarros = await Marca.bulkCreate(marcas);

    return marcasCarros;
  } catch (error) {
    return error;
  }
};

module.exports = postMarca;

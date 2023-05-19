const { MarcaRep } = require("../db");

const postMarcaReps = async (marcas) => {
  try {
    const marcasRep = await MarcaRep.bulkCreate(marcas);

    return marcasRep;
  } catch (error) {
    return error;
  }
};

module.exports = postMarcaReps;

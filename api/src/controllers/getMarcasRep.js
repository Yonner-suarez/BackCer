const { MarcaRep } = require("../db");

const getMarcasRep = async () => {
  try {
    const marcasReps = await MarcaRep.findAll();
    return marcasReps;
  } catch (error) {
    return error;
  }
};

module.exports = getMarcasRep;

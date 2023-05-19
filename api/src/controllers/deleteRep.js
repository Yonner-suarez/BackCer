const { Repuesto } = require("../db");

const deleteRep = async (nombre) => {
  try {
    await Repuesto.destroy({ where: { nombre: nombre } });

    return "El repuesto fue eliminado exitosamente";
  } catch (error) {
    return error;
  }
};
module.exports = deleteRep;

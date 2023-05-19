const { Repuesto, Marca, MarcaRep } = require("../db");

const getRepuestos = async () => {
  try {
    const repuestos = await Repuesto.findAll({
      include: [
        {
          model: Marca,
          through: {
            attributes: [],
          },
        },
        {
          model: MarcaRep,
          attributes: ["marcaRep"],
        },
      ],
    });

    return repuestos;
  } catch (error) {
    return error;
  }
};

module.exports = getRepuestos;

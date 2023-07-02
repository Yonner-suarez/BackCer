const cloudinary = require("cloudinary").v2;
const { Repuesto, Marca, MarcaRep } = require("../db");

cloudinary.config({
  cloud_name: "de8cx2rgu",
  api_key: "765323192782653",
  api_secret: "a4-8MavrZ8XMT1Of9LfcW1PRLr0",
});

const postRepuesto = async ({ nombre, imagen, precio, marca, marcaReps }) => {
  try {
    const resp = cloudinary.uploader.upload(imagen, {
      public_id: nombre,
    });

    resp
      .then((data) => {
        res.json(data.secure_url);
      })
      .catch((err) => {});

    // // Generate
    const url = cloudinary.url(nombre, {
      width: 240,
      height: 480,
      Crop: "fill",
    });

    const marcaCarro = await Marca.findOne({
      where: {
        marca: marca,
      },
    });
    const marcaRepuesto = await MarcaRep.findOne({
      where: {
        marcaRep: marcaReps,
      },
    });

    console.log(nombre, url, precio);
    const nuevoRepuesto = await Repuesto.create({
      nombre: nombre,
      imagen: url,
      precio: precio,
    });

    await nuevoRepuesto.addMarcas(marcaCarro);
    await nuevoRepuesto.setMarcaRep(marcaRepuesto);

    return nuevoRepuesto;
  } catch (error) {
    return error;
  }
};

module.exports = postRepuesto;

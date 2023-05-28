const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-337264305447969-052614-1a8550f94f6f169b0947602117976077-1383343081",
});

let producto = [
  {
    name: "holias",
    precio: "2.666",
  },
  {
    name: "jujis",
    precio: "2.866",
  },
];

const generarOrden = async () => {
  let preference = {
    items: producto.map((rep) => {
      let number = parseFloat(rep.precio.replace(/\./g, "").replace(",", "."));
      return {
        tiitle: rep.nombre,
        unit_price: number,
        currency_id: "COP",
        quantity: 1,
      };
    }),
    back_urls: {
      success: "https://page-cer.vercel.app/",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    notification_url:
      "https://backcer-production.up.railway.app/confirmacionDePago",
    binary_mode: true,
    auto_return: "approved",
    expires: true,
    installments: 1,
  };

  try {
    const peticionOrden = await mercadopago.preferences.create(preference);

    return peticionOrden.body.init_point;
  } catch (error) {
    return error;
  }
};

module.exports = generarOrden;

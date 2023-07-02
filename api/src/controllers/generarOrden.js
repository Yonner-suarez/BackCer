const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-337264305447969-052614-1a8550f94f6f169b0947602117976077-1383343081",
});

const generarOrden = async (producto) => {
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
      success: "http://localhost:5173/",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    notification_url: "https://7e49-45-65-234-48.ngrok.io/confirmacionDePago",
    binary_mode: true,
    auto_return: "approved",
    expires: true,
    installments: 1,
    payer: {
      email: "yonnerhazziel@gmail.com",
    },
  };

  try {
    const peticionOrden = await mercadopago.preferences.create(preference);

    return peticionOrden.body.init_point;
  } catch (error) {
    return error;
  }
};

module.exports = generarOrden;

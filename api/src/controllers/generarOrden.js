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
        quantity: rep.cantidad,
      };
    }),
    back_urls: {
      success: "https://page-cer.vercel.app/success",
      pending: "https://page-cer.vercel.app/pending",
      failure: "https://page-cer.vercel.app/failure",
    },
    notification_url: "https://backcer.onrender.com/confirmacionDePago",
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

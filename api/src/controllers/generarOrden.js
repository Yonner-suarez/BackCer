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
    // back_urls: {
    //   success: "http://localhost:5173/success",
    //   pending: "http://localhost:5173/pending",
    //   failure: "http://localhost:5173/failure",
    // },
    // notification_url:
    //   "https://4d80-2803-1800-1118-1d47-cc5c-ba29-a135-93a4.ngrok.io/confirmacionDePago",

    payment_methods: {
      excluded_payment_methods: [
        {
          id: "efecty",
        },
      ],
      excluded_payment_types: [
        {
          id: "cash",
        },
        {
          id: "efecty",
        },
      ],
      installments: 1,
    },
    binary_mode: true,
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

//const headers = {
//   Authorization: `Bearer TEST-337264305447969-052614-1a8550f94f6f169b0947602117976077-1383343081`,
// };
// // Realiza una solicitud GET a la API de Mercado Pago para obtener los métodos de pago
// axios
//   .get("https://api.mercadopago.com/v1/payment_methods", { headers })
//   .then((response) => {
//     const paymentMethods = response.data;

//     // Muestra los métodos de pago en la consola
//     console.log("Métodos de pago disponibles en Mercado Pago:");
//     paymentMethods.forEach((method) => {
//       console.log(`- ${method.id}: ${method.name}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error al obtener los métodos de pago:", error);
//   });

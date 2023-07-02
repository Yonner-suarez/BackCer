const mercadopago = require("mercadopago");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "casaeuropeaderepuestos@gmail.com",
    pass: "jzmc ttdm mvaz bhkt",
  },
});

const confirmacionDePago = async (payment) => {
  try {
    if (payment.type === "payment") {
      const obtenerStatus = await mercadopago.payment.findById(
        payment["data.id"]
      );

      console.log(mercadopago.payment.schema.properties.payer.properties);
      let mailOptions = {
        from: "casaeuropeaderepuestos@gmail.com",
        to: "yonnerhazziel@gmail.com",
        subject: "Compra Exitosa",
        text: "Hola, esto es un correo de prueba enviado con Nodemailer.",
        html: "<b>Hola,</b><br>Esto es un correo de prueba enviado con <strong>Nodemailer</strong>.",
      };

      // Envía el correo electrónico
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return error;
        } else {
          return "Correo electrónico enviado: " + info.response;
        }
      });
      return obtenerStatus.status;
    }
  } catch (error) {
    return error;
  }
};

module.exports = confirmacionDePago;

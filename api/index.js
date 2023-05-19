const app = require("./src/app");
const { conn } = require("./src/db.js");
require("dotenv").config();

const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`estoy en el puerto ${PORT}`);
  });
});

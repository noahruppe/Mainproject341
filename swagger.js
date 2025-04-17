const swaggerAutogen = require("swagger-autogen")();
const swagger = require("./routes/swagger.js");

const doc = {
  info: {
    title: "user API",
    description: "userAPI",
  },
  host: "samuel-team5.onrender.com",
  schemes: ["https"],
};

const outputfile = "./swagger.json";
const endpointfile = ["./routes/index"];

swaggerAutogen(outputfile, endpointfile, doc);

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "user API",
    description: "userAPI",
  },
  host: "localhost:3002",
  schemes: ["http"],
};

const outputfile = "./swagger.json";
const endpointfile = ["./routes/index"];

swaggerAutogen(outputfile, endpointfile, doc);

const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "user API",
        description: "userAPI"
    },
    host: "https://mainproject341-5ixv.onrender.com",
    schemes: ["https"]
}

const outputfile = "./swagger.json";
const endpointfile = ["./routes/index"];

swaggerAutogen(outputfile, endpointfile, doc);

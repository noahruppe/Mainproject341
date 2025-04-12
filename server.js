const app = require("./app");
const mongodb = require("./data/database");
const port = process.env.PORT || 3002;

mongodb.initdb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log("Server is listening at " + port);
        });
    }
});

process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\nException origin: ${origin}`);
});
 
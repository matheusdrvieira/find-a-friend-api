import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen({
    host: "0.0.0.0",
    port: PORT
}).then(() => {
    console.log(`🚀 HTTP Server Running on ${PORT}!`);
}).catch((err) => {
    console.log({
        error: err,
        message: `❌ "HTTP Server is Failed on ${PORT}!`
    });
});

import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import Server from "./bootstrap/server.bootstrap";

(async() => {
    const serve = new Server();
    const db = new DatabaseBootstrap();
    try {
        await serve.initialize();
        await db.initialize();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})()
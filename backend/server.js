import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./config/config.env") });
import app from "./app.js";

console.log(process.env.PORT);
app.listen(process.env.PORT, ()=>{
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
})

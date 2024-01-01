import express from "express";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use(userRoute);

app.listen(8000, () => {
    console.log("Server running...");
});

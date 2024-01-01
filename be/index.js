import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);

app.listen(8000, () => {
    console.log("Server running...");
});

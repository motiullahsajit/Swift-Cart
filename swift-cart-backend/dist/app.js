import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
// Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
const port = 4000;
const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
    res.send("API working with /api/v1/");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express Server listening on port ${port}`);
});

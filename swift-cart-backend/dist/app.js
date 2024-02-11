import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
// Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/dashboard.js";
config({
    path: "./.env",
});
const app = express();
app.use(express.json());
app.use(morgan("dev"));
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
export const nodeCache = new NodeCache();
app.get("/", (req, res) => {
    res.send("API working with /api/v1/");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express Server listening on port ${port}`);
});

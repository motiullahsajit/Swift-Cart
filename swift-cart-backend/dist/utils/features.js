import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";
export const connectDB = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017", {
        dbName: "swift_cart",
    })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log("DB connection error: ", e));
};
export const InvalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        const products = await Product.find({}).select("_id");
        products.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        });
        nodeCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};

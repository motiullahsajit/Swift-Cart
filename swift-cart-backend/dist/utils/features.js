import mongoose from "mongoose";
export const connectDB = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017", {
        dbName: "swift_cart",
    })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log("DB connection error: ", e));
};

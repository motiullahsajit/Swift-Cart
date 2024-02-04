import express from "express";
// Importing routes
import userRoute from "./routes/user.js";
const port = 4000;
const app = express();
app.use("api/v1/user", userRoute);
app.get("/", (req, res) => {
    res.send("API working with /api/v1/");
});
app.listen(port, () => {
    console.log(`Express Server listening on port ${port}`);
});

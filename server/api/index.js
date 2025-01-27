import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "../routes/client.js";
import generalRoutes from "../routes/general.js";
import managementRoutes from "../routes/management.js";
import salesRoutes from "../routes/sales.js";


//configuration

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes

app.get("/", (req, res)=>{
   res.send("Hello World!")
});
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//mongoose

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("database connected");
    // add data one time

    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // // User.insertMany(dataUser);
    //  console.log("done")
    //Transaction.insertMany(dataTransaction);
    //OverallStat.insertMany(dataOverallStat)
    //AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => {
    console.log(`${error}: did not connect`);
  });

export default app;

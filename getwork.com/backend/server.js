import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import UserRouter from './routes/UserRouter.js'
import EmployeeRouter from './routes/EmployeeRoutes.js'
import EmployerRouter from './routes/EmplyerRoutes.js'
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

mongoDB();
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("API IS HOT");
});


app.use("/api", UserRouter);
app.use("/api/employee", EmployeeRouter)
app.use("/api/employer", EmployerRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log("SERVER STARTED");
});

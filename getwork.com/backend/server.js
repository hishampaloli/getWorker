import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import UserRouter from "./routes/UserRouter.js";
import EmployeeRouter from "./routes/EmployeeRoutes.js";
import EmployerRouter from "./routes/EmplyerRoutes.js";
import JobsRouter from "./routes/jobsRoute.js";
import AdminRouter from "./routes/AdminRoutes.js";
import ProposalRouter from "./routes/ProposalRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

mongoDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API IS HOT");
});

app.use("/api", UserRouter);
app.use("/api/employee", EmployeeRouter);
app.use("/api/employer", EmployerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api", JobsRouter);
app.use("/api", ProposalRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log("SERVER STARTED");
});
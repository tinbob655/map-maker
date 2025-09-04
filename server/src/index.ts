import express from "express";
import cors from "cors";

//import routes
import helloRoute from './routes/hello';
import userMapsRoute from './routes/userMaps';

//setup app
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

//mount routes
app.use("/api", helloRoute);
app.use("/api", userMapsRoute);


app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
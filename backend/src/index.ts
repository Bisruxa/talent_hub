import * as dotenv from 'dotenv'
dotenv.config();
import app from './server.ts'
import { env } from "../env.ts";
app.listen(env.PORT, () => {
  console.log(`listing to port ${env.PORT}`);
});
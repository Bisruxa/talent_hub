import * as dotenv from 'dotenv';
dotenv.config();
import app from './server.js';
import { env } from "../env.js";
app.listen(env.PORT, () => {
    console.log(`listing to port ${env.PORT}`);
});
//# sourceMappingURL=index.js.map
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { isTestEnv } from '../env.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev", {
    skip: () => isTestEnv(),
}));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'mini job portal'
    });
});
app.use('/auth', authRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);
export { app };
export default app;
//# sourceMappingURL=server.js.map
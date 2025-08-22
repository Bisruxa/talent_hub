import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {env,isDev,isTestEnv} from '../env.ts'
import authRoutes from './routes/authRoutes.ts'
import jobRoutes from './routes/jobRoutes.ts'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.use(
  morgan("dev", {
    skip: () => isTestEnv(),
  })
);
app.get('/health',(req,res)=>{
  res.status(200).json({
    status:'OK',
    timestamp:new Date().toISOString(),
    service:'mini job portal'
  })
})
app.use('/auth',authRoutes)
app.use('/api',jobRoutes)
export {app}
export default app
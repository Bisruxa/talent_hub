import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.get('/health',(req,res)=>{
  res.status(200).json({
    status:'OK',
    timestamp:new Date().toISOString(),
    service:'mini job portal'
  })
})
export {app}
export default app
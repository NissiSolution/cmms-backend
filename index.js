const express = require('express');
const cors=require('cors')
const app=express()
const port =3039;
const router=require('./src/Routes/routes.api')
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://nissicmms.digidiary.in']; // Add allowed origins
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use( express.json());
app.use( express.urlencoded( { extended:true } ))
app.use('/api',router)

app.listen(port, () => {
    console.log(`Node serer is listenings on port${port}`);
  });
const express = require('express');
const cors=require('cors')
const path = require('path');
const app=express()
const port =3039;
const router=require('./src/Routes/routes.api')


app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://nissicmms.digidiary.in', 'http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.static('public'));
app.use( express.json());
app.use( express.urlencoded( { extended:true } ))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',router)

app.listen(port, () => {
    console.log(`Node serer is listenings on port${port}`);
  });
const express = require('express');
const app=express()
const cors=require('cors')
const port =3039;
const router=require('./src/Routes/routes.api')
app.use(cors({
  origin: 'https://nissicmms.digidiary.in', 
  credentials: true,
}));
app.use( express.json());
app.use( express.urlencoded( { extended:true } ))
app.use('/api',router)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://nissicmms.digidiary.in');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(port, () => {
    console.log(`Node serer is listenings on port${port}`);
  });
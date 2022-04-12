const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');


app.use(express.static(__dirname+'/dist/imagenes'));
app.get('/',function(req,res){
    res.sendFile(path.join(publicPath+'index.html'), function(err) {             
        if (err) {                 
             res.status(500).send(err) 
             }        
        });
});

app.listen(process.env.PORT || 4200,()=>{
    console.log(__dirname);
});
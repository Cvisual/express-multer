const express = require("express"); 
require('dotenv').config();
const morgan = require('morgan')
const cors = require('cors')
const multer  = require('multer')


const app = express(); 
const PORT = process.env.PORT || 5000; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

const upload = multer({ storage: storage })

app.use( morgan('dev') )
app.use( cors() );
app.use( express.json() );
app.use( express.static('public') );

//info: multiple
app.post('/photos', upload.array('photos', 12), function (req, res, ) {    
    //console.log(req.file);
    
    
    let dt = new Array()

    req.files.forEach(d => {
        dt.push(d.filename);
    });
    
    res.send(dt)
});
//info: info
// app.post('/photos', upload.single('photo'), function (req, res, ) {    
//     console.log(req.file.filename);
//     res.send("Data")
// });

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
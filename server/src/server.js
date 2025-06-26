const http=require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fileupload=require('express-fileupload');
const userRoutes=require('./routes/user.route')
const fileRoutes=require('./routes/file.route')
const dotenv=require('dotenv').config()
const corsOptions={
    origin:"http://localhost:5173"
}

app.use(cors(corsOptions));
app.use(cors());
app.use(fileupload({ useTempFiles: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes)
app.use(fileRoutes)
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




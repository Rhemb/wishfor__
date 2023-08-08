const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8000

//req mongoose.config
require('./config/mongoose_config')
app.use(
    cookieParser(),
    cors({credentials: true, origin: 'http://localhost:3000'}),
    express.json(), 
    express.urlencoded({extended: true})
);
require('dotenv').config();

//req route
require('./routes/itemRoutes')(app);
require('./routes/userRoutes')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
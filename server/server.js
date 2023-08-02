const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000
app.use(cors());

//req mongoose.config
require('./config/mongoose_config')
app.use(express.json(), express.urlencoded({extended: true}));

//req route
require('./routes/itemRoutes')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
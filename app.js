const express = require('express');
const config = require('config');

const app = express();
app.use(express.json());
app.use('/api', require('./routes/notes.routes'));

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`app5000 ${PORT}`))
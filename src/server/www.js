const express = require('express');
const logfmt = require('logfmt');

const app = express();

app.use(logfmt.requestLogger());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => res.status(200).send('For great justice!'));

const port = Number(process.env.PORT || 5000);

app.listen(port, () => console.log("Listening on " + port));

export default app;

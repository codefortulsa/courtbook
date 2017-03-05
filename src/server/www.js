import {getLogger} from "log4js";
import app from "./app";

const log = getLogger("server");

const port = Number(process.env.PORT || 5000);
app.listen(port, () => log.info("Listening on " + port));

const express = require("express");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/tasks", tasks);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

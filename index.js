const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;

app.use(cors());

const store = new Map();

app.get("/report-open-scheme", (req, res) => {
  const { uuid } = req.query;
  if (!uuid) return res.status(400).send("missing uuid");

  store.set(uuid, true);

  setTimeout(() => store.delete(uuid), 10000);

  res.send("ok");
});

app.get("/get-open-scheme", (req, res) => {
  const { uuid } = req.query;
  if (!uuid) return res.status(400).send("missing uuid");

  if (store.has(uuid)) {
    res.send("1");
    store.delete(uuid);
  } else {
    res.send("0");
  }
});

app.get("/", (req, res) => {
  res.send("Đây là trang check deep link của Tuan xu");
});

app.listen(port, () => {
  console.log(`DeepLink API running at http://localhost:${port}`);
});

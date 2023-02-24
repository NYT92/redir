import express, { json } from "express";
import { Base } from "deta";
import { Validator as _Validator } from "jsonschema";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader("cache-control", "maxage=3600, immutable");
  next();
});

function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/list", async (req, res) => {
  const limit = req.query.l || 5;
  const query = req.query.q;
  const db = Base("shortlnk_db");
  const item = await db.fetch(query, limit);
  res.status(200).json(item);
});

app.get("/l/:id", async (req, res) => {
  const id = req.params.id;
  const db = Base("shortlnk_db");
  const item = await db.get(id);
  if (item === null) {
    return res.json({
      status: 200,
      message: "ok",
    });
  } else {
    let countURLRedirct = item.stats.clicks;
    countURLRedirct++;
    await db.update(
      {
        stats: {
          clicks: countURLRedirct,
        },
      },
      item.id
    );
    res.redirect(item.original_link);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const db = Base("shortlnk_db");
  const item = await db.get(req.params.id);
  if (item) {
    await db.delete(item.id);
    res.status(200).json({
      status: "200",
      message: "delete item successfully",
    });
  } else if (!item) {
    res.status(404).json({
      status: "404",
      message: "item could not be found",
    });
  }
});

app.post("/api/update/:id", async (req, res) => {
  const data = req.body;
  const idparam = req.params.id;
  const db = Base("shortlnk_db");
  const valor = _Validator;
  const v = new valor();
  const schema = {
    type: "object",
    properties: {
      original_link: {
        type: "string",
      },
      id: {
        type: "string",
      },
    },
    required: ["id"],
  };
  const result = v.validate(
    {
      original_link: data.original_link,
      id: data.id,
    },
    schema
  );
  if (result.errors.length > 0 || isValidURL(data.original_link) === false) {
    res.status(400).json({
      status: 400,
      message: "bad request",
    });
  } else {
    try {
      await db.update(
        {
          original_link: data.original_link,
          id: data.id,
        },
        idparam
      );
      res.status(200).json({
        status: 200,
        message: "updated successfully",
        short_link: `${req.protocol}://${req.get("host")}/${data.id}`,
      });
    } catch {
      res.status(404).json({
        status: 404,
        message: "not found",
      });
    }
  }
});

app.post("/api/create", async (req, res) => {
  const data = req.body;
  const db = Base("shortlnk_db");
  const valor = _Validator;
  const v = new valor();
  const schema = {
    type: "object",
    properties: {
      original_link: {
        type: "string",
      },
      id: {
        type: "string",
      },
      stats: {
        type: "object",
        properties: {
          clicks: {
            type: "number",
          },
        },
      },
    },
    required: ["original_link"],
  };
  const resid = !data.id ? Math.random().toString(36).substr(2, 7) : data.id;
  const result = v.validate(
    {
      original_link: data.original_link,
      id: resid,
      stats: {
        clicks: 0,
      },
    },
    schema
  );
  const notallowed = ["aslnk", "nyt92", "nsdev", "nscdn"];
  const urlnotallowed = ["grabify.link"];

  if (result.errors.length > 0 || isValidURL(data.original_link) === false) {
    res.status(400).json({
      status: 400,
      message: "bad request",
    });
  } else {
    await db.put(
      {
        original_link: data.original_link,
        id: resid,
        stats: {
          clicks: 0,
        },
      },
      resid
    );
    res.status(200).json({
      status: 200,
      short_link: `${req.protocol}://${req.get("host")}/${resid}`,
    });
  }
});

app.get("/link", (req, res) => {
  res.redirect(req.query.link);
});

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log("server started http://localhost:" + port);
});

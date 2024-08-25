const express = require("express");
const cheerio = require("cheerio");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const validator = require("validator");

const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // Limit to 5 requests per window
  standardHeaders: true, // Return rate limit info in the headers
  legacyHeaders: false, // Disable legacy headers
});

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use((req, res, next) => {
  if (req.rateLimit && req.rateLimit.remaining === 0) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  next();
});

app.post("/fetch-metadata", async (req, res) => {
  const urls = req.body.urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "Invalid URL list" });
  }

  const promises = urls.map((url) => {
    return fetch(validator.isURL(url) ? url : "")
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);

        const title = $("title").text();
        const description = $('meta[name="description"]').attr("content");
        const image = $('meta[property="og:image"]').attr("content");
        const metadata = {
          url,
          title,
          description,
          image,
        };
        return metadata;
      })
      .catch((error) => {
        return { url, error: "Failed to fetch metadata " + error };
      });
  });
  const results = await Promise.all(promises); // Wait for all promises to resolve
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

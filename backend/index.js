const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      let jsonData = JSON.parse(data);
      let sortedData = jsonData.reverse();
      return res.status(200).send(sortedData);
    }
  });
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      let jsonData = JSON.parse(data);
      const post = jsonData.find((item) => item.id == id);
      return res.status(200).send(post);
    }
  });
});

app.post("/new-post", (req, res) => {
  const { title, news, creatorName, creatorEmail } = req.body;

  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      let jsonData = JSON.parse(data);
      const lastIndex = jsonData.length - 1;
      const nextId = lastIndex >= 0 ? jsonData[lastIndex].id + 1 : 1;

      let newData = {
        id: nextId,
        title,
        news,
        creatorName,
        creatorEmail,
      };
      jsonData.push(newData);

      fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error writing file");
        } else {
          return res
            .status(201)
            .json({ success: true, message: "Data created successfully." });
        }
      });
    }
  });
});

app.patch("/update-post/:id", (req, res) => {
  const { id } = req.params;
  const { title, news, creatorName, creatorEmail } = req.body;

  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      let jsonData = JSON.parse(data);
      const index = jsonData.findIndex((item) => item.id == id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      } else {
        jsonData[index].title = title;
        jsonData[index].news = news;
        jsonData[index].creatorName = creatorName;
        jsonData[index].creatorEmail = creatorEmail;

        fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error writing file");
          } else {
            return res.status(201).json({
              success: true,
              message: "Data updated successfully.",
            });
          }
        });
      }
    }
  });
});

app.delete("/delete-post/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      let jsonData = JSON.parse(data);
      const index = jsonData.findIndex((item) => item.id == id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      } else {
        jsonData.splice(index, 1);

        fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error writing file");
          } else {
            return res.status(200).json({
              success: true,
              message: "Data deleted successfully.",
            });
          }
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

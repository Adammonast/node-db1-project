const express = require("express");
const db = require("./data/dbConfig");
const router = express.Router();

router.get("/", (request, response) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      console.log(accounts);
      response.status(200).json(accounts);
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "Failed to retrieve list of accounts" });
    });
});

router.post("/", (request, response) => {
  console.log(request.body);
  db("accounts")
    .insert(request.body)
    .then(ids => {
      response.status(201).json(ids);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "Failed to add the post" });
    });
});

router.get("/:id", (request, response) => {
  db("accounts")
    .where({ id: request.params.id })
    .first()
    .then(post => {
      response.status(200).json(post);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "failed to get the specific post" });
    });
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const changes = request.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      response.status(200).json(count);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "failed to update the post" });
    });
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      response.status(200).json(count);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "failed to delete post" });
    });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));
const Contact = require("./models/contact");
const cors = require("cors");
app.use(cors());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response
      .status(400)
      .send({ error: "that's a shite id format, mate" });
  } else if (error.code === 11000) {
    return response
      .status(400)
      .send({ error: `${request.body.name} is already in your contact list` });
  } else if (error.name === "ValidationError" && request.body.name.length < 3) {
    return response
      .status(400)
      .json({ error: "Name must be at least 3 characters long" });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: "That doesn't look like a telephone number to me" });
  }
  next(error);
};

app.get("/api/contacts", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

app.get("/api/info", (request, response) => {
  const timeStamp = new Date();
  Contact.count({}).then((number) =>
    response.send(`<h1>You have ${number} contacts</h1><h3>${timeStamp}</h3>`)
  );
});

app.get("/api/contacts/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/contacts", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and number are required",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact);
    })
    .catch((error) => next(error));
});

app.delete("/api/contacts/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`PeePee PooPoo out of port ${PORT}`);

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to ClustyLady");

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to ClustyLady");
  })
  .catch((error) => {
    console.log("error connecting to ClustyLady:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, unique: true },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);

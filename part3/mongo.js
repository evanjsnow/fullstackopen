const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://evansnow:${password}@clustylady01.lr2s7af.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length < 3) {
  console.log("Try again with your password");
  process.exit(1);
} else if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log(`Added ${contact.name} ${contact.number} to contact list`);
    mongoose.connection.close();
  });
} else if (process.argv.length > 5) {
  console.log("You fucked something up, try again");
  process.exit(1);
}

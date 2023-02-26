const path = require('path');

const fs = require('fs');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }

    console.table(
      JSON.parse(data).find(contact => contact.id === String(contactId))
    );
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const contactsList = JSON.parse(data).filter(
      contact => contact.id !== String(contactId)
    );
    console.table(contactsList);

    fs.writeFile(contactsPath, JSON.stringify(contactsList), error => {
      if (error) {
        console.log(error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const contactsList = JSON.parse(data);
    contactsList.push({
      id: contactsList.length + 1,
      name,
      email,
      phone,
    });
    console.table(contactsList);

    fs.writeFile(contactsPath, JSON.stringify(contactsList), error => {
      if (error) {
        console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

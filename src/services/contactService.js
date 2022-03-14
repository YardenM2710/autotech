import { storageService } from './storageService.js';
import { makeId } from './utilService.js';

export const contactService = {
  query,
  save,
  remove,
  getById,
  getEmptyContact,
};

const STORAGE_KEY = 'contacts';

const gDefaultContacts = [
  {
    _id: makeId(7),
    name: 'Ochoa ',
    lastName: 'Hyde',
  },
  {
    _id: makeId(7),
    name: 'Dominique ',
    lastName: 'Sote',
  },
  {
    _id: makeId(7),
    name: 'Floyd ',
    lastName: 'Rutledge',
  },
  {
    _id: makeId(7),
    name: 'Glenna ',
    lastName: 'Santana',
  },
  {
    _id: makeId(7),
    name: 'Pinhas ',
    lastName: 'Hakatan',
  },
  {
    _id: makeId(7),
    name: 'John ',
    lastName: 'Lennux',
  },
  {
    _id: makeId(7),
    name: 'Optimus ',
    lastName: 'Prime',
  },
];

var gContacts = _loadContacts();

function query(filterBy) {
  let contactsToReturn = gContacts;
  if (filterBy) {
    var { text } = filterBy;
    contactsToReturn = gContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(text.toLowerCase())
    );
  }
  return Promise.resolve([...contactsToReturn]);
}

function getById(id) {
  const contact = gContacts.find((contact) => contact._id === id);
  return Promise.resolve({ ...contact });
}

function remove(id) {
  const idx = gContacts.findIndex((contact) => contact._id === id);
  gContacts.splice(idx, 1);
  if (!gContacts.length) gContacts = gDefaultContacts.slice();
  storageService.store(STORAGE_KEY, gContacts);
  return Promise.resolve();
}

function save(contactToSave) {
  if (contactToSave._id) {
    const idx = gContacts.findIndex(
      (contact) => contact._id === contactToSave._id
    );
    gContacts.splice(idx, 1, contactToSave);
  } else {
    contactToSave._id = makeId();
    gContacts.unshift(contactToSave);
  }
  storageService.store(STORAGE_KEY, gContacts);
  return Promise.resolve(contactToSave);
}

// function _update(contactToSave) {
//     const idx = gContacts.findIndex(contact => contact._id === contactToSave._id)
//     gContacts.splice(idx, 1, contactToSave)
//     return Promise.resolve(contactToSave)
// }

// function _add(contactToSave) {

// }

function getEmptyContact() {
  return {
    name: '',
    lastName: '',
  };
}

function _loadContacts() {
  let contacts = storageService.load(STORAGE_KEY);
  if (!contacts || !contacts.length) contacts = gDefaultContacts;
  storageService.store(STORAGE_KEY, contacts);
  return contacts;
}

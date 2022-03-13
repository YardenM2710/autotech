import { contactService } from '../../services/contactService';

export function loadContacts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().contactModule;
    try {
      const contacts = await contactService.query(filterBy);
      console.log(contacts);
      dispatch({ type: 'SET_CONTACTS', contacts });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.remove(contactId);
      dispatch({ type: 'REMOVE_CONTACT', contactId });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy });
  };
}

export function getContactById(contactId) {
  return async () => {
    return await contactService.getById(contactId);
  };
}

export function save(contact) {
  return async (dispatch) => {
    try {
      console.log('IM HERE');
      await contactService.save(contact);
      dispatch({ type: 'UPDATE_CONTACT', contact });
    } catch (err) {
      console.log(err);
    }
  };
}

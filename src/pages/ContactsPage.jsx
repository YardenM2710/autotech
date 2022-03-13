import { useEffect } from 'react';
import { contactService } from '../services/contactService';
import { connect } from 'react-redux';
import { ContactList } from '../components/ContactList';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions';

export function _ContactsPage(props) {
  const { contacts } = props;
  const history = useHistory();

  useEffect(async () => {
    props.loadContacts();
  }, []);

  const removeContact = async (id) => {
    props.removeContact(id);
  };

  const onSelectContact = (id) => {
    history.push(`/contact/edit/${id}`);
  };

  const onAddNewContact = () => {
    history.push(`/contact/edit/`);
  };

  if (!contacts) return <div>Loading...</div>;
  return (
    <div className="contacts-page container puff-in-center">
      <div className="action-btns ">
        <IconButton onClick={onAddNewContact} edge="end" aria-label="delete">
          <label>Add</label>
          <AddIcon />
        </IconButton>
      </div>
      <ContactList
        removeContact={removeContact}
        onSelectContact={onSelectContact}
        contacts={contacts}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
};

export const ContactsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactsPage);

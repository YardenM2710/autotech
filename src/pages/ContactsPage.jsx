import { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { ContactList } from '../components/ContactList';
import { ContactFilter } from '../components/ContactFilter';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import update from 'immutability-helper';

import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions';

export function _ContactsPage(props) {
  const [data, setData] = useState(null);
  const { contacts } = props;
  const history = useHistory();

  useEffect(() => {
    setData(contacts);
  }, [contacts]);

  useEffect(() => {
    props.loadContacts();
  }, []);

  const onChangeFilter = (filterBy) => {
    props.setFilterBy(filterBy);
    props.loadContacts();
  };

  const removeContact = async (id) => {
    props.removeContact(id);
  };

  const onSelectContact = (id) => {
    history.push(`/contact/edit/${id}`);
  };

  const onAddNewContact = () => {
    history.push(`/contact/edit/`);
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div className="contacts-page container puff-in-center">
      <ContactFilter onChangeFilter={onChangeFilter} />
      <div className="action-btns ">
        <IconButton onClick={onAddNewContact} edge="end" aria-label="delete">
          <label>Add</label>
          <AddIcon />
        </IconButton>
      </div>

      <ContactList
        moveCard={moveCard}
        removeContact={removeContact}
        onSelectContact={onSelectContact}
        contacts={data}
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

import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { contactService } from '../services/contactService';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { save } from '../store/actions/contactActions';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

export function _ContactEdit(props) {
  const history = useHistory();
  const params = useParams();
  const [contact, setContact] = useState(null);

  useEffect(async () => {
    const id = params.id;
    const contact = id
      ? await contactService.getById(id)
      : contactService.getEmptyContact();
    setContact(contact);
  }, []);

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setContact((contact) => (contact = { ...contact, [field]: value }));
  };

  const onSaveContact = (ev) => {
    ev.preventDefault();
    if (!contact.name || !contact.lastName) {
      return alert('First name or Last name is required');
    }
    props.save(contact);
    history.push('/contact');
  };

  if (!contact) return <div>Loading...</div>;
  return (
    <div className="contact-edit bounce-in-top ">
      <img src={`https://robohash.org/${contact._id}`} alt="" />
      <form onSubmit={onSaveContact}>
        <label htmlFor="name">Name</label>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="name"
            onChange={handleChange}
            value={contact.name}
            name="name"
            variant="standard"
          />
        </Box>
        <label htmlFor="phone">Last Name</label>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

          <TextField
            onChange={handleChange}
            value={contact.lastName}
            type="text"
            name="lastName"
            id="lastName"
            variant="standard"
          />
        </Box>
        <label htmlFor="email">id</label>
        <div className="contact-id">
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <DeviceUnknownIcon sx={{ color: 'action.active', mr: 5 }} />
            <span>{contact._id}</span>
          </Box>
        </div>
        <Button
          onClick={onSaveContact}
          color="secondary"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contact: state.contactModule.contact,
  };
};

const mapDispatchToProps = {
  save,
};

export const ContactEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEdit);

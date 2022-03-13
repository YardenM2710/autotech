import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function ContactList({ contacts, onSelectContact, removeContact }) {
  const onRemoveContact = (ev, id) => {
    ev.stopPropagation();
    ev.preventDefault();
    removeContact(id);
  };

  const onEditContact = (ev, id) => {
    ev.preventDefault();
    ev.stopPropagation();
    onSelectContact(id);
  };

  return (
    <section className="contact-list">
      <table className="contacts">
        <tbody>
          <tr>
            <th> id</th>
            <th> Name</th>
            <th> Last name</th>
            <th>Actions</th>
          </tr>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact._id}</td>
              <td>{contact.name}</td>
              <td>{contact.lastName}</td>
              <td className="contact-actions">
                <IconButton
                  onClick={(ev) => onRemoveContact(ev, contact._id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={(ev) => onEditContact(ev, contact._id)}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

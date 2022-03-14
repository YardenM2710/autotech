import { ItemPreview } from './ItemPreview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
export function ContactList({
  contacts,
  onSelectContact,
  removeContact,
  moveCard,
}) {
  return (
    <section className="contact-list">
      <table className="contacts">
        <tbody>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Actions</th>
          </tr>
          <DndProvider backend={HTML5Backend}>
            {contacts.map((contact, idx) => (
              <ItemPreview
                key={contact._id}
                contact={contact}
                onSelectContact={onSelectContact}
                removeContact={removeContact}
                index={idx}
                id={contact._id}
                moveCard={moveCard}
              />
            ))}
          </DndProvider>
        </tbody>
      </table>
    </section>
  );
}

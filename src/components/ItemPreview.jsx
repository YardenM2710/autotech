import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'grab',
};

export function ItemPreview({
  removeContact,
  onSelectContact,
  index,
  id,
  moveCard,
  contact,
}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const onRemoveContact = (ev, id) => {
    ev.preventDefault();
    removeContact(id);
  };

  const onEditContact = (ev, id) => {
    ev.stopPropagation();
    onSelectContact(id);
  };
  return (
    <>
      <tr ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
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
    </>
  );
}

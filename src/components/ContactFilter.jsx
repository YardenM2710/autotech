import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export function ContactFilter({ onChangeFilter }) {
  const [filterBy, setFilterBy] = useState({ text: '' });

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setFilterBy({ [field]: value });
  };

  useEffect(() => {
    onChangeFilter(filterBy);
  }, [filterBy]);

  return (
    <form className="contact-filter">
      <section className="input-container">
        <label htmlFor="text">Search Contacts </label>
        <TextField
          id="standard-basic"
          placeholder="Contact name / Last name"
          onChange={handleChange}
          value={filterBy.text}
          type="text"
          name="text"
          variant="standard"
        />
      </section>
    </form>
  );
}

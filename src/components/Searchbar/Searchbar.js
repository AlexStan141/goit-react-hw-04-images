import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    setSearch(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ search: search });
  };

  return (
    <header className="searchbar">
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className="button-label">Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

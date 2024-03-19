/* eslint-disable sort-keys */
/* eslint-disable no-alert */
/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Form } from 'react-router-dom';

import { Button, FormControl, Input } from '@mui/material';

import { Search } from '@nxweb/icons/tabler';

interface SearchBarProps {
  readonly onSubmit: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [term, setTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    onSubmit(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term === '') return alert('Please enter search term!');
    setTerm('');
  };

  return (
      <FormControl sx={{ width: '100%' }}>
        <Form onSubmit={submitHandler}>
          <Input
            endAdornment={<Button type="submit"><Search /></Button>}
            placeholder="Search Pokemon..."
            sx={{ width: '100%', pl: 2 }}
            type="text"
            value={term}
            onChange={handleChange} />
        </Form>
      </FormControl>
  );
};

export default SearchBar;

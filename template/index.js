import React from 'react';
import ReactDOM from 'react-dom';
import NoteTemplate from '@/note';
import DefaultTemplate from '@/default';

const type = window.TEMPLATE_TYPE;
const TEMPLATE_TYPES = {
  note: <NoteTemplate />,
};
ReactDOM.render(
  TEMPLATE_TYPES[type] || <DefaultTemplate />,
  document.getElementById('root')
);

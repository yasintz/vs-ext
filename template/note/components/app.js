import React, { Component } from 'react';
import { CONTEXT } from '@/note/context';
import Note from './note';
import './app.less';
class App extends Component {
  render() {
    return (
      <div className="note-list">
        {this.context.store.db.notes.map(note => (
          <Note note={note} key={note.uuid} />
        ))}
      </div>
    );
  }
}
App.contextType = CONTEXT;
export default App;

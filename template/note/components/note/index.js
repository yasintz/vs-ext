import React, { Component } from 'react';
import { getVscode, WEB_VIEW_LISTENER_FLAGS } from '@/note/utils';
class Note extends Component {
  state = {
    input: '',
  };
  onInputChange = e => {
    this.setState({
      input: e.target.value,
    });
  };
  updateName = () => {
    this.context.actions.updateName(this.state.input);
  };
  deleteNote = uuid => {
    getVscode().postMessage({
      flag: WEB_VIEW_LISTENER_FLAGS.DELETE_NOTE,
      data: { uuid },
    });
  };
  openFile = uuid => {};
  render() {
    const { note } = this.props;
    return (
      <div key={note.uuid} className='note-wrapper'>
        <div>
          <p>{note.content}</p>
          <br />
          {['line', 'selection', 'file'].indexOf(note.type) > -1 && (
            <span>{note.property.filePath}</span>
          )}
        </div>
        <button
          onClick={() => {
            this.deleteNote(note.uuid);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Note;

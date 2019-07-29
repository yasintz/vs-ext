import React from 'react';
import App from '@/note/components/app';
import { store } from '@/note/store';
import { CONTEXT } from '@/note/context';

import './index.less';

class Root extends React.Component {
  state = { ...store };
  updateName = name => {
    this.setState({ name });
  };

  get actions() {
    return {
      updateName: this.updateName,
    };
  }
  render() {
    return (
      <CONTEXT.Provider
        value={{
          store: this.state,
          actions: this.actions,
        }}
      >
        <App />
      </CONTEXT.Provider>
    );
  }
}

export default Root;

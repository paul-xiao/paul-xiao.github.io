import React from 'react';

class Info extends React.Component {
  componentDidMount(){
    document.title = "info"
  }
  render() {
    return <div>Info here</div>
  }
}

export default Info;

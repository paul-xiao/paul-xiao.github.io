import React from 'react';

class Info extends React.Component {
  componentDidMount(){
    document.title = "info"
  }
  render() {
    return <div> <a href="#/">Info</a><h1>Info</h1></div>
  }
}

export default Info;

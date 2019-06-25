import React from 'react';
const styles = {
  menu: {
    background: '#FFF'
  }
}
class Home extends React.Component {
  componentDidMount(){
    document.title = "pandax"
  }
  render() {
    return <div style={styles.menu}>
      <h1>Home</h1>
      <a href="#Info">Info</a>
      </div>
  }
}

export default Home;

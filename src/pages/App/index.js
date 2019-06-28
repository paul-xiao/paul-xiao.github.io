import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const menu = [
  {
    name: 'About',
    url: '#About'
  },
  {
    name: 'Blog',
    url: '#Blog'
  }
]
class App extends React.Component {
  render() {
    return <div className="container">
      <Header menu={menu} />
       <div className="main">
         {this.props.children}
       </div>
      <Footer/>
    </div>
  }
}
export default App;

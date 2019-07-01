import React from 'react';
import {Helmet} from 'react-helmet';
class Home extends React.Component {

  state = {
    value: '',
    data: ''
  };
  change = (e) => {
    this.setState({ value: e.target.value })
  }

  
  componentDidMount(){
    document.title = "pandax"
  }
  render() {
    return <div>
    <Helmet>
        <title>Home</title>
        <meta name="description" content="paul-xiao.io" />
    </Helmet>
    </div>
  }
}

export default Home;

import React from 'react';
import { message } from 'antd';
import firebase from '../../firebase'

const info = msg => {
  message.info(msg);
};
class Home extends React.Component {

  state = {
    value: '',
    data: ''
  };
  change = (e) => {
    this.setState({ value: e.target.value })
  }

  async getData() {
		try {
      await firebase.getData().then(data => {
        this.setState({
          data: JSON.stringify(data)
        })
      })
		} catch(error) {
			alert(error.message)
		}
  }
  
  async setData(data) {
		try {
      await firebase.setData('users',data).then(() => {
        info('setData success')
      })
		} catch(error) {
			alert(error.message)
		}
	}
  componentDidMount(){
    document.title = "pandax"
  }
  render() {
    return <div className="container">
    </div>
  }
}

export default Home;

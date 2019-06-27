import React from 'react';
import { Layout, Menu, Breadcrumb, message, Button, Input } from 'antd';
import firebase from '../../firebase'

const { Header, Content, Footer } = Layout
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
    return <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme=""
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
         <div>
         <Button onClick={() => this.getData()}>getData</Button>
          <p>{this.state.data}</p>
         </div>
         
         <div>
           <p>{this.state.value}</p>
        <Input type="text" onChange={this.change.bind(this)}/> <br/>
        <Button onClick={() => this.setData(this.state.value)}>setData</Button></div>
        
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Created by Paul.Xiao</Footer>
  </Layout>
  }
}

export default Home;

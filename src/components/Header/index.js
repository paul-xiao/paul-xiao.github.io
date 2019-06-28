import React from 'react';
class Header extends React.Component {
  menuItems = this.props.menu.map(item =>
  {
    return <li className="menu-item" key={item.name}><a href={item.url}>{item.name}</a></li>
  }
  )
  render() {
    return <header className='header'>
        <div className="logo">
           <div className="img">logo</div>
        </div>
        <div className="menu">
           <ul>
               {this.menuItems}
           </ul>
        </div>
    </header>
  }
}
export default Header;

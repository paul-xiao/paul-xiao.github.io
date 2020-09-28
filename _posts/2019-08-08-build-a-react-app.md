---
title: build a react app
date: 2019-08-08 11:43:05
tags:
 - react
categories:
 - framework
thumbnail: '/thumbnails/react.jpg'
---

react apps
<!-- more -->
####  this.props.content



#### scss support

default support scss, only need install node-sass as dependency

```bash
npm i node-sass -D
```

#### how user auth works
> [auth-workflow](https://reacttraining.com/react-router/web/example/auth-workflow)



#### add antd
```js
yarn add antd

import {Button} from 'antd'
@import '~antd/dist/antd.css';


```

#### data bind

``` js
 // binding input value by targe name
 handleChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    });
  }

 <Input type="text" name="username" 
        value={this.state.username} 
        onChange={this.handleChange} />


```


#### functional-vs-class-components

> [Functional vs Class-Components in React](https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108)

- Functional component
  - pros
    - Functional component are much easier to read and test because they are plain JavaScript functions without state or lifecycle-hooks
    - You end up with less code
    - They help you to use best practices. It will get easier to separate container and presentational components because you need to think more about your component’s state if you don’t have access to setState() in your component
    - The React team mentioned that there may be a performance boost for functional component in future React versions

```js

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

```

- Class component
  - pros
    - state
    - lifecycle-hooks

```js

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```

#### withRouter pass props

```js

const AuthButton = withRouter(
  ({ history , ...props}) =>
  isLogin ? (
      <span>
        Welcome! {props.name}
        <Button
         
          onClick={() => {
            fakeAuth.signout(() => {
              history.push("/");
              clearToken();
            });
          }}
        >
          Sign out
        </Button>
      </span>
    ) : (
      <p>You are not logged in.</p>
    )
);

```


#### use constructor or not

> [where-initialize-state-react](https://daveceddia.com/where-initialize-state-react/)


```js
// use constructorgit 
class App extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      loggedIn: false,
      currentState: "not-panic",

      // Note: think carefully before initializing
      // state based on props!
      someInitialValue: this.props.initialValue
    }
  }

  render() {
    // whatever you like
  }
}

// Class field declarations for JavaScript stage 3
class App extends React.Component {
  state = {
    loggedIn: false,
    currentState: "not-panic",
    someDefaultThing: this.props.whatever
  }

  render() {
    // whatever you like
  }
}

```

#### [react-redux](https://www.npmjs.com/package/redux-thunk)

**Without react-redux throw error**: Actions must be plain objects. Use custom middleware for async actions. 

> Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters


#### umi antd dva
> the antd combo



#### wtf is this.props.children

> same as slots in vue
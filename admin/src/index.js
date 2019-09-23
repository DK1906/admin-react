import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import User from '../src/utils/localStorage'
import Memory from '../src/utils/memory'
import store from './redux/store'

const user= User.getUser();
console.log(user)


Memory.user = user;
console.log(Memory.user)


 

ReactDOM.render(
(<Provider store={store}>
  <App></App>
</Provider>),document.getElementById('root'))


// store.subscribe(()=>{
//     ReactDOM.render(<App store={store} />,document.getElementById('root'))
// })



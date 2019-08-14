import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Articles from './Articles';
import Private from './Private';
import Public from './Public';
// import firebase from './firebase';
// import { getPrivateMes, getPublicMes } from './api';


const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/articles'>Articles</Link></li>
        <li><Link to='/private'>private</Link></li>
        <li><Link to='/public'>public</Link></li>
      </ul>
    </div>
    <Route path='/articles' component={Articles}></Route>
    <Route path='/private' component={Private}></Route>
    <Route path='/public' component={Public}></Route>
  </BrowserRouter>
)

export default App;

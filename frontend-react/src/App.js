import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Articles from './components/articles/Articles';
import Private from './components/Private';
import Public from './components/Public';
import PostArticle from './components/articles/PostArticle';
import UpdateArticle from './components/articles/UpdateArticle';
// import firebase from './firebase';
// import { getPrivateMes, getPublicMes } from './api';


const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/articles'>Articles</Link></li>
        <li><Link to='/private'>private</Link></li>
        <li><Link to='/public'>public</Link></li>
        <li><Link to='/articles/post'>post</Link></li>
      </ul>
    </div>
    <Route exact path='/articles' component={Articles}></Route>
    <Route path='/private' component={Private}></Route>
    <Route path='/public' component={Public}></Route>
    <Route path='/articles/post' component={PostArticle}></Route>
    <Route path='/articles/:id/update' component={UpdateArticle}></Route>
  </BrowserRouter>
)

export default App;
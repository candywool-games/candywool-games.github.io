import React from 'react';
//import styles from './App.module.scss';
import SiteLayout from './components/SiteLayout';
import Home from './components/Home';
import BlogHome from './components/Blog/BlogHome';
import { Route } from 'react-router-dom';
import BlogPost from './components/Blog/BlogPost/index';

const App: React.FC = () => {
  return (
    <SiteLayout>
      <Route exact path="/" component={Home}/>
      <Route exact path="/blog" component={BlogHome}/>
      <Route path="/blog/posts/:postId" component={BlogPost}/>
    </SiteLayout>
  );
}

export default App;

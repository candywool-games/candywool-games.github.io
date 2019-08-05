import React from 'react';
//import styles from './App.module.scss';
import SiteLayout from './components/SiteLayout';
import Home from './components/Home';
import BlogHome from './components/Blog/BlogHome';
import { Route, Switch } from 'react-router-dom';
import BlogPost from './components/Blog/BlogPost/index';
import NotFound from './components/NotFound';
import ScrollRestoration from './components/ScrollRestoration';

const App: React.FC = () => {
  return (
    <ScrollRestoration>
      <SiteLayout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/blog" component={BlogHome}/>
          <Route path="/blog/posts/:postId" component={BlogPost}/>
          <Route component={NotFound}/>
        </Switch>
      </SiteLayout>
    </ScrollRestoration>
  );
}

export default App;

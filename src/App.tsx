import React from 'react';
import styles from './App.module.scss';
import SiteLayout from './components/SiteLayout';
import BlogHome from './components/Blog/BlogHome';

const App: React.FC = () => {
  return (
    <SiteLayout>
      <BlogHome />
    </SiteLayout>
  );
}

export default App;

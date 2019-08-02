import React from 'react';
import styles from './App.module.scss';
import BlogHome from './components/Blog/BlogHome';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      {/* <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="success">Success</Button>
      </header> */}
      <BlogHome />
    </div>
  );
}

export default App;

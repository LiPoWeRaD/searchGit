import { Header } from './components/Header/header';
import { TableGitSearch } from './components/TableGitSearch/tableGitSearch';
import { Footer } from './components/Footer';
import styles from './Styles/main.module.scss';


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.container}>
        <TableGitSearch />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

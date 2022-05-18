import { ListView } from './pages/ListView'
import { APIServiceProvider } from './services/APIService'
import { GalleryServiceProvider } from './services/GalleryService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import { css, cx } from '@emotion/css'

const styles = {
  app: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '60px auto 60px',
    maxWidth: '800px',
    margin: 'auto',
    padding: '0 10px',
  }),
  header: css({
    color: 'white',
    textAlign: 'right',
    fontSize: '20px',
    alignSelf: 'center',
    marginRight: '39px',
  }),
  content: css({
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 'calc(100vh - 120px)',
  }),
  footer: css({
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    display: 'flex',
    gap: '50px',
    justifySelf: 'center',
    alignSelf: 'center',
  }),
}

const isMock = !import.meta.env.VITE_APP_UNSPLASH_API_KEY

function App() {
  return (
    <APIServiceProvider mock={isMock}>
      <GalleryServiceProvider>
        <div className={styles.app}>
          <SearchBar className={styles.header} />
          <ListView className={styles.content} />
          <NavBar className={styles.footer} />
        </div>
      </GalleryServiceProvider>
    </APIServiceProvider>
  )
}

function SearchBar(props: { className?: string }) {
  return (
    <div className={cx(props.className)}>
      <FontAwesomeIcon icon={faSearch} />
    </div>
  )
}

function NavBar(props: { className?: string }) {
  return (
    <div className={cx(props.className)}>
      <FontAwesomeIcon icon={faTh} />
      <FontAwesomeIcon icon={faThList} />
    </div>
  )
}

export default App

import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { CountrySelectorComponent } from '../components';
import { BackgroundComponent } from '../components/background/background.component';

const Home: NextPage = () => {
  return (<>
    <div className={styles.main}>
      <CountrySelectorComponent />
      <BackgroundComponent/>
    </div>
  </>);
}

export default Home

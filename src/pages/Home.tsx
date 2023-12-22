import { IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Appbar from '../common/appbar/Appbar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Appbar title='Bluetooth LE'/>
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;

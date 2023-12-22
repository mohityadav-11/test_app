import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { isPlatform } from "@ionic/react";


const Appbar: React.FC<any> = ({
  title,
  showBackButton = false,
  defaultHref = "/home",
}: {
  title: String;
  showBackButton: boolean;
  defaultHref: String;
}) => {
  return (
    <div >
      <IonToolbar className="header" style={isPlatform('ios') ? {marginTop: '50px'} : {}}>
      {showBackButton && (
        <IonButtons slot="start">
          <IonBackButton className="custom-back-button" defaultHref={`${defaultHref}`} />
        </IonButtons>
      )}
        <IonTitle style={{margin: showBackButton ? 0 : '20px', padding: 0, fontSize: '16px'}}>{title}</IonTitle>
      </IonToolbar>
    </div>
  );
};

export default Appbar;

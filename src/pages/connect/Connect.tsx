import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isPlatform } from "@ionic/react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router";
import Spinner from "../../common/spinner/Spinner";
import { useEffect, useState } from "react";
import { BLE, BLEOriginal } from "@ionic-native/ble";
import Appbar from "../../common/appbar/Appbar";



const Connect: React.FC = () => {
  const location = useLocation();
  const [state, setState] = useState<Record<string, any>>({
    peripheral : {},
    status: "Connecting",
    deviceName: "",
    errorMsg: "",
    log: '',
    services: undefined
  });
  const path = location.pathname.split("/");
  const deviceId = path[2] ?? "";

  const getDetails = async (peripheral: any) => {
    let deviceName;
    if(isPlatform("android")){
      const nameCharacteristic = await BLE.read(
        deviceId!,
        "00001800-0000-1000-8000-00805F9B34FB",
        "00002a00-0000-1000-8000-00805F9B34FB"
      );
      deviceName = String.fromCharCode.apply(
        null,
        Array.from(new Uint8Array(nameCharacteristic))
      );
    }

    setState({ ...state, deviceName, peripheral, status: "Connected", log: "Discovered Device:" + JSON.stringify(peripheral), services: [...peripheral.services] });
  };

  const onConnected = async (peripheral: any) => {
    try {
      await getDetails(peripheral);
    } catch (err: any) {
      setState({
        ...state,
        errorMsg: "ERROR: " + err.toString(),
        status: "Error",
      });
    }
  };

  const onDeviceDisconnected = (peripheral: any) => {
    setState({ ...state, peripheral, status: "Disconnected" });
  };

  const disconnectOnClose = () => {
    BLE.disconnect(deviceId).then(
      () => console.log("Disconnected " + JSON.stringify(state.peripheral)),
      () =>
        console.log("ERROR disconnecting " + JSON.stringify(state.peripheral))
    );
  };


  const scanDevices = () => {
    BLE.connect(deviceId).subscribe(
      (peripheral) => onConnected(peripheral),
      (peripheral) => onDeviceDisconnected(peripheral)
    );
  }

  useEffect(() => {
    return disconnectOnClose;
  }, []);

  useEffect(() => {
    scanDevices();
  }, []);

  return (
    <IonPage>
      <Appbar title={state.status} showBackButton={true} />
      <IonContent className="m-4" fullscreen>
        {state.status === "Connecting" && (
          <div className="mt-5 d-flex justify-content-center">
            <Spinner msg={`Connecting to ${deviceId}`} />
          </div>
        )}

        <div>{state.errorMsg}</div>

        {state.status === 'Disconnected' && <div>{state.status}</div>}

        {(state.deviceName || state.peripheral) && state.status === "Connected" && (
          <div className="d-flex justify-content-center fs-4">
            <span>Connected to </span>
            <span style={{ marginLeft: "5px" }}></span>
            <span style={{ fontWeight: "bold" }}>
              {state.deviceName || state.peripheral.name || "Unnamed"}
            </span>
          </div>
        )}

{/* {state.peripheral && state.status === "Connected" && (
          <div className="d-flex justify-content-center fs-4">
            <span>Name:</span>
            <span style={{ marginLeft: "5px" }}></span>
            <span style={{ fontWeight: "bold" }}>
              {state.peripheral.name || "Unnamed"}
            </span>
          </div>
        )} */}

        {state.services && (
          <><div>
            <div>Services:</div>
            {typeof state.services
            // .map((uid:any) => (
            //   <div>
            //     {uid}
            //   </div>
            // ))
            }
          </div>
          <div>
            <div>Characteristics:</div>
            {typeof state.peripheral}
            </div>
            </>
        )}


        {state.log && (
          <div>{state.log}</div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Connect;

import {
  IonButton
} from "@ionic/react";
import "./ExploreContainer.css";
import { useState } from "react";
import { BLE } from "@ionic-native/ble";
import ScanLoader from "../common/ScanLoader";
import { Link } from "react-router-dom";

interface ContainerProps {}
interface Devices {
  list: any;
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const inData: Devices = {
    list: [],
  };
  const [error, setError] = useState("");
  const [logDevice, setLogDevice] = useState("");
  const [status, setStatus] = useState("initial");
  const [devices, setDevices] = useState<Devices>(inData);

  const data = [
    { name: "My device" },
    { name: "device 2" },
    { name: "iphone" },
  ];

  const onDeviceDiscovered = (device: any) => {
    if (status !== "completed") {
      setStatus("completed");
    }
    console.log("inside log");
    console.log(devices.list.length);
    console.log("Discovered" + JSON.stringify(device, null, 2));
    setLogDevice("Discovered Device:" + JSON.stringify(device));
    devices.list.push(device);
    
    const newList: any[] = devices.list.filter(
      (obj: any, index: number) =>
        devices.list.findIndex((item: any) => item.id === obj.id) === index
    );
    setDevices({ list: newList})//.filter((item: any) => item.connectable) });
  };

  const scanError = (error: any) => {
    setStatus("error");
    setError("Error " + error);
  };

  const scan = () => {
    setStatus("scanning");
    setError("");

    BLE.scan([], 60).subscribe(
      (devices) => onDeviceDiscovered(devices),
      (error) => scanError(error),
      () => {
        setStatus("completed");
      }
    );

    setTimeout(() => {
      setStatus("completed");
    }, 5000);
  };

  return (
    <div className="m-2">

      {/* <div>{logDevice}</div> */}

      {status !== "completed" && status !== "error" && (
        <div
          style={{ height: "25vh" }}
          className="m-1 d-flex flex-column justify-content-center align-items-center"
        >
          {status === "initial" && (
            <IonButton onClick={scan}>Scan Devices</IonButton>
          )}
          {status === "scanning" && (
            <>
              <ScanLoader />
              <div className="mt-2">Scanning for available devices</div>
            </>
          )}
        </div>
      )}

      {status === "error" && (
        <div
          style={{ height: "25vh" }}
          className="m-5 d-flex flex-column text-danger justify-content-center align-items-center"
        >
          {error}
          <IonButton className="mt-3" onClick={scan}>
            Try Again
          </IonButton>
        </div>
      )}

      {status === "completed" && (
        <>
          <div
            style={{ height: "25vh" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <IonButton className="mt-3" onClick={scan}>
              Scan Again
            </IonButton>
            {devices && devices.list && devices.list.length === 0 && (
              <div>No Device Found</div>
            )}
          </div>
        </>
      )}

      {devices &&
        devices.list &&
        devices.list.map((d: any, index: number) => (
          <div>
            {index === 0 && (
              <div>
                <div>Available Devices:</div>
              </div>
            )}
            <div className="listItem d-flex justify-content-between align-items-center mb-2 fs3">
              <div>{d.name || d.id}</div>
              <Link className="ion-link" to={`/connect/${d.id}`}>
              Connect
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
                fill="white"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
              </svg>
            </Link>
            </div>
          </div>
        ))}

      {/* {data.map((d: any, index: number) => (
        <div>
          {index === 0 && (
            <div>
              <div>Available Devices:</div>
            </div>
          )}
          <div className="listItem d-flex justify-content-between align-items-center mb-2 fs3">
            <div>{d.name}</div>
            <Link className="ion-link" to={`/connect/${d.name}`}>
              Connect
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
                fill="white"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
              </svg>
            </Link>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ExploreContainer;

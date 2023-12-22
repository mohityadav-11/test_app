import "./Spinner.css";

const Spinner: React.FC<any> = ({msg}: {msg: String}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="spinner mb-2" />
      <div>{msg}</div>
    </div>
  );
};

export default Spinner;

import Notes from "./Notes";

export default function home(props) {
  const showAlert = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
}

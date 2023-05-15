import { useParams } from "react-router-dom";
import Header from "../../../components/Header";

function TeamProfile() {
  const { id } = useParams();

  return (
    <div>
      <Header />

      <p>Team profile {id}</p>
    </div>
  );
}

export default TeamProfile;

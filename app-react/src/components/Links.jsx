import { Link } from "react-dom";

function Links() {
  return (
    <div className="links">
      <Link to="/login">Connexion</Link>
      <Link to="/register">Enregistrement</Link>
    </div>
  );
}

export default Links;
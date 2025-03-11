import "../assets/style.css";

function Header() {
  return (
    <header className="header">
      <h1>Organiz'Asso</h1>
      <div className="logo">
        <img src="/assets/logo_sorbonne.png" alt="Logo de Sorbonne Université" />
      </div>
    </header>
  );
}

export default Header;
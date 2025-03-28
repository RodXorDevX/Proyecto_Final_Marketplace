import SidebarPerfil from "../components/SidebarPerfil";
import PublicacionCard from "../components/PublicacionCard";
import publicaciones from "../data/mockPublicaciones";
import "../assets/css/MiPerfil.css";

function MiPerfil() {
  return (
    <div className="perfil-container">
      <SidebarPerfil />
      
      <main className="main-content">
        <h2>MIS PUBLICACIONES</h2>
        <div className="publicaciones-grid">
          {publicaciones.map((p) => (
            <PublicacionCard key={p.id} publicacion={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default MiPerfil;

import SidebarPerfil from "../components/SidebarPerfil";
import PublicacionCard from "../components/PublicacionCard";
import publicaciones from "../data/mockPublicaciones";

function Perfil() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarPerfil />

      <main style={{ flex: 1, background: "#d9d9d9", padding: "2rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>MIS PUBLICACIONES</h2>
        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap"
        }}>
          {publicaciones.map((p) => (
            <PublicacionCard key={p.id} publicacion={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Perfil;

export function Header({ favCount }) {
  return (
    <header className="site-header" style={{ background: "#1e293b", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Thư viện ReactJS</h1>
      <div>Yêu thích: <strong>{favCount}</strong></div>
    </header>
  );
}
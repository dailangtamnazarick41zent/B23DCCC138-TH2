export function Section({ title, children }) {
  return (
    <section style={{ margin: "1.5rem 0" }}>
      <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
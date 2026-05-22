import { brandConfig } from "../brand.config";

export function SectionRenderer() {
  return (
    <>
      {brandConfig.packages.map((item) => (
        <article key={item.name}>
          <span>{item.name}</span>
          <strong>{item.price}</strong>
          <p>{item.note}</p>
        </article>
      ))}
    </>
  );
}

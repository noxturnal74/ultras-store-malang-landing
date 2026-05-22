import { brandConfig } from "../brand.config";

export function Hero() {
  return (
    <section className={`hero theme-${brandConfig.layout}`}>
      <p>{brandConfig.dna.visual}</p>
      <h1>{brandConfig.dna.business}</h1>
      <a href={brandConfig.publicLink}>Open official profile</a>
    </section>
  );
}

import { brandConfig } from "../brand.config";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="hero">
      <Logo />
      <p>{brandConfig.hero.eyebrow}</p>
      <h1>{brandConfig.hero.title}</h1>
      <a href={brandConfig.publicLink}>{brandConfig.hero.cta}</a>
    </section>
  );
}

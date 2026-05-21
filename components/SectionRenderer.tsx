import { brandConfig } from "../brand.config";

export function SectionRenderer() {
  return (
    <>
      {brandConfig.sections.map((section) => (
        <section id={section.id} key={section.id}>
          <p>{section.kicker}</p>
          <h2>{section.title}</h2>
          <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </>
  );
}

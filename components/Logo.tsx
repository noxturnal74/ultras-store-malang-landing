import { brandConfig } from "../brand.config";

export function Logo() {
  return (
    <span className="logo-lockup">
      <img src="./assets/logo.svg" alt={`${brandConfig.brandName} logo`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <span className="logo-fallback">{brandConfig.monogram}</span>
      <strong>Ultras Store</strong>
    </span>
  );
}

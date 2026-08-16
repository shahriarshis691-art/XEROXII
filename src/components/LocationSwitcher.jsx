import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function LocationSwitcher({ variant = "header", onOpen }) {
  const { country, currencyCode, openLocationModal } = useContext(AppContext);

  const handleClick = () => {
    onOpen?.();
    openLocationModal();
  };

  if (variant === "footer") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.16em] text-black/60 transition hover:text-black"
        aria-label="Change shopping location and currency"
      >
        <span aria-hidden="true">{country?.flag}</span>
        <span>
          {country?.name} · {currencyCode}
        </span>
      </button>
    );
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex min-h-11 w-full items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
        aria-label="Change shopping location and currency"
      >
        <span aria-hidden="true">{country?.flag}</span>
        <span>
          {country?.name} · {currencyCode}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-11 items-center gap-1.5 px-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-black/65 transition hover:text-black sm:h-auto sm:px-0"
      aria-label={`Shopping location ${country?.name}, currency ${currencyCode}`}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {country?.flag}
      </span>
      <span className="hidden sm:inline">{currencyCode}</span>
    </button>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export default function SearchableSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Buscar...",
  disabled = false,
  hasError = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // If there's no valid selection, reset the search text
        if (!options.includes(search)) {
          setSearch(value);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options, search, value]);

  // Sync display text with external value changes
  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setSearch(opt);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
    // Clear the selected value if user is typing something different
    if (value && e.target.value !== value) {
      onChange("");
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    setSearch(""); // Clear to show all options
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={`w-full bg-negro border ${
          hasError
            ? "border-rojo error-field shadow-[0_0_10px_rgba(255,51,51,0.2)]"
            : "border-blanco/10"
        } rounded-xl px-5 py-4 text-blanco focus:outline-none focus:border-rojo transition-all duration-300 placeholder:text-gris-dark ${
          disabled ? "opacity-40 cursor-not-allowed" : ""
        }`}
      />
      {/* Dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="#B3B3B3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && filtered.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 max-h-56 overflow-y-auto bg-negro border border-blanco/10 rounded-xl shadow-2xl shadow-negro/80 scrollbar-hide">
          {filtered.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-5 py-3 text-sm cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl ${
                opt === value
                  ? "bg-rojo/20 text-rojo font-semibold"
                  : "text-blanco hover:bg-blanco/5"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
      {isOpen && !disabled && filtered.length === 0 && search.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-negro border border-blanco/10 rounded-xl shadow-2xl px-5 py-4 text-sm text-gris">
          No se encontraron resultados
        </div>
      )}
    </div>
  );
}

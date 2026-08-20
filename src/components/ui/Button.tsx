import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "default" | "lg";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  external = false,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 font-heading comic-stroke tracking-[0.1em] transition-all duration-300 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo rounded-none font-bold overflow-hidden";

  const variantClasses = {
    primary:
      "bg-rojo text-blanco-pure hover:bg-blanco-pure hover:text-rojo",
    outline:
      "bg-negro text-blanco border border-blanco/30 hover:bg-rojo hover:border-rojo hover:text-blanco-pure",
  };

  const sizeClasses = {
    default: "px-8 py-3 text-xl",
    lg: "px-10 py-5 text-2xl md:text-3xl",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const clipStyle = { clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" };

  const renderContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      {/* Decorative corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 bg-blanco/30" />
      <span className="absolute bottom-0 right-0 w-2 h-2 bg-negro/30" />
    </>
  );

  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        style={clipStyle}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {renderContent()}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} style={clipStyle} aria-label={ariaLabel}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button className={classes} style={clipStyle} onClick={onClick} aria-label={ariaLabel} type="button">
      {renderContent()}
    </button>
  );
}

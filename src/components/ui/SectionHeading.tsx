import RevealOnScroll from "./RevealOnScroll";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${alignClasses}`}>
      <RevealOnScroll>
        <span className="inline-flex items-center text-rojo text-sm font-mono uppercase tracking-[0.2em] mb-4">
          <span className="w-2 h-2 bg-rojo mr-3 animate-pulse" />
          // SYS_LOG: {label.replace(/ /g, "_")}
        </span>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <h2 className="font-heading comic-stroke text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-blanco uppercase leading-[0.9] mb-6">
          {title}
        </h2>
      </RevealOnScroll>
      {description && (
        <RevealOnScroll delay={0.2}>
          <p className="text-gris text-base md:text-lg leading-relaxed">{description}</p>
        </RevealOnScroll>
      )}
    </div>
  );
}

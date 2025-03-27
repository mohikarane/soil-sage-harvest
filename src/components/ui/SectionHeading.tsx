
import { ReactNode } from "react";

interface SectionHeadingProps {
  pretitle?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeading = ({
  pretitle,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`max-w-2xl ${alignmentClasses[align]} ${className}`}>
      {pretitle && (
        <p className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          {pretitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

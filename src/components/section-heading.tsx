export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">{eyebrow}</p>
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-sm leading-7 text-neutral-400 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

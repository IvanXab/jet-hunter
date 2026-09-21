export interface SectionHeadingProps {
  index: string;
  title: string;
}

export function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-[14px] font-mono text-label tracking-label">
      <div className="size-1 -translate-y-[3px] rounded-full bg-ink opacity-60" />
      <div className="text-ink-muted">{index}</div>
      <div className="text-ink-secondary">{title}</div>
    </div>
  );
}

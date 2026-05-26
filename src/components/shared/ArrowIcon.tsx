type Props = {
  className?: string;
};

export default function ArrowIcon({ className = "size-4 stroke-current" }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

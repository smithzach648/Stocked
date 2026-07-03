export default function ComingSoon({ title, note }) {
  return (
    <div className="flex flex-col items-center gap-2 pt-24 text-center">
      <h2 className="font-display text-2xl font-semibold text-moss">
        {title}
      </h2>
      <p className="max-w-xs text-sm text-ink/60">{note}</p>
    </div>
  );
}

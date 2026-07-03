export default function EmptyPantry({ onAdd }) {
  return (
    <div className="flex flex-col items-center gap-4 pt-20 text-center">
      <svg
        viewBox="0 0 64 64"
        className="h-16 w-16 fill-none stroke-moss/50"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        {/* empty shelf */}
        <line x1="8" y1="44" x2="56" y2="44" />
        <line x1="12" y1="44" x2="12" y2="52" />
        <line x1="52" y1="44" x2="52" y2="52" />
        {/* lone jar */}
        <rect x="26" y="26" width="12" height="18" rx="3" />
        <line x1="27" y1="24" x2="37" y2="24" />
      </svg>
      <div>
        <h2 className="font-display text-xl font-semibold text-moss">
          Your shelves are empty
        </h2>
        <p className="mt-1 max-w-xs text-sm text-ink/60">
          Add what's in your kitchen right now. Recipes and shopping lists
          build from here.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="min-h-[48px] rounded-lg bg-moss px-6 font-semibold text-paper"
      >
        Add your first item
      </button>
    </div>
  );
}

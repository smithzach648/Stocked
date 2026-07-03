import { adjustQuantity } from '../../db/pantry';

export default function QuantityStepper({ item }) {
  const btn =
    'flex h-11 w-11 items-center justify-center rounded-lg border border-sage bg-white text-xl font-semibold text-moss transition-colors active:bg-sage disabled:opacity-30';

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        className={btn}
        onClick={() => adjustQuantity(item.id, -1)}
        disabled={item.quantity <= 0}
        aria-label={`Decrease ${item.name}`}
      >
        &minus;
      </button>
      <button
        className={btn}
        onClick={() => adjustQuantity(item.id, 1)}
        aria-label={`Increase ${item.name}`}
      >
        +
      </button>
    </div>
  );
}

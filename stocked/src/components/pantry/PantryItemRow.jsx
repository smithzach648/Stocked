import QuantityStepper from './QuantityStepper';
import { stockStatus } from '../../db/pantry';

const BADGES = {
  low: { text: 'Low', className: 'bg-amber/15 text-amber' },
  out: { text: 'Out', className: 'bg-brick/10 text-brick' }
};

export default function PantryItemRow({ item, onEdit }) {
  const status = stockStatus(item);
  const badge = BADGES[status];

  return (
    <li className="flex items-center gap-2 border-b border-sage px-3 py-2 last:border-b-0">
      <button
        onClick={() => onEdit(item)}
        className="flex min-h-[44px] min-w-0 flex-1 flex-col items-start justify-center text-left"
        aria-label={`Edit ${item.name}`}
      >
        <span
          className={`flex items-center gap-2 truncate font-medium ${
            status === 'out' ? 'text-ink/40' : 'text-ink'
          }`}
        >
          {item.name}
          {badge && (
            <span
              className={`rounded px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${badge.className}`}
            >
              {badge.text}
            </span>
          )}
        </span>
        <span className="text-xs text-ink/50">
          {item.quantity} {item.unit}
        </span>
      </button>
      <QuantityStepper item={item} />
    </li>
  );
}

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { stockStatus } from '../../db/pantry';

export default function AppHeader() {
  const items = useLiveQuery(() => db.pantryItems.toArray(), [], []);

  const low = items.filter((i) => stockStatus(i) === 'low').length;
  const out = items.filter((i) => stockStatus(i) === 'out').length;

  return (
    <header className="px-4 pb-3 pt-5">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-bold text-moss">Stocked</h1>
        <p className="text-sm text-ink/70">
          {items.length} item{items.length === 1 ? '' : 's'}
          {low > 0 && (
            <span className="ml-2 font-semibold text-amber">{low} low</span>
          )}
          {out > 0 && (
            <span className="ml-2 font-semibold text-brick">{out} out</span>
          )}
        </p>
      </div>
    </header>
  );
}

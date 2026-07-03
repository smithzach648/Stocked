import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { CATEGORIES } from '../../constants';
import CategoryShelf from './CategoryShelf';
import ItemFormModal from './ItemFormModal';
import EmptyPantry from './EmptyPantry';

export default function PantryScreen() {
  const items = useLiveQuery(() => db.pantryItems.toArray(), [], null);
  const [modal, setModal] = useState(null); // null | 'add' | item object

  if (items === null) return null; // first Dexie read, avoids a flash

  const grouped = CATEGORIES.map((category) => ({
    category,
    items: items
      .filter((i) => i.category === category)
      .sort((a, b) => a.name.localeCompare(b.name))
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-8">
      {items.length === 0 ? (
        <EmptyPantry onAdd={() => setModal('add')} />
      ) : (
        grouped.map((g) => (
          <CategoryShelf
            key={g.category}
            category={g.category}
            items={g.items}
            onEdit={(item) => setModal(item)}
          />
        ))
      )}

      {items.length > 0 && (
        <button
          onClick={() => setModal('add')}
          className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-3xl leading-none text-paper shadow-lg transition-transform active:scale-95"
          aria-label="Add pantry item"
        >
          +
        </button>
      )}

      {modal && (
        <ItemFormModal
          item={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

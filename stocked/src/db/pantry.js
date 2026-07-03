import { db } from './db';

// All pantry writes go through these helpers so timestamps stay consistent.

export async function addPantryItem({
  name,
  category,
  quantity,
  unit,
  lowThreshold
}) {
  const now = Date.now();
  const item = {
    id: crypto.randomUUID(),
    name: name.trim(),
    category,
    quantity,
    unit,
    lowThreshold: lowThreshold ?? null,
    addedAt: now,
    updatedAt: now
  };
  await db.pantryItems.add(item);
  return item;
}

export async function updatePantryItem(id, changes) {
  await db.pantryItems.update(id, { ...changes, updatedAt: Date.now() });
}

export async function adjustQuantity(id, delta) {
  const item = await db.pantryItems.get(id);
  if (!item) return;
  const next = Math.max(0, Math.round((item.quantity + delta) * 100) / 100);
  await db.pantryItems.update(id, { quantity: next, updatedAt: Date.now() });
}

export async function deletePantryItem(id) {
  await db.pantryItems.delete(id);
}

// Stock status used by badges (and by the low-stock pull in Phase 3).
export function stockStatus(item) {
  if (item.quantity <= 0) return 'out';
  if (item.lowThreshold != null && item.quantity <= item.lowThreshold)
    return 'low';
  return 'ok';
}

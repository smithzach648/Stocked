import Dexie from 'dexie';

// Schema follows the build brief, section 3, exactly.
// All four tables are declared now so Phases 2–4 add no migrations.
export const db = new Dexie('stocked');

db.version(1).stores({
  // Indexed fields only — Dexie stores every other field without indexing.
  pantryItems: 'id, name, category, quantity, updatedAt',
  shoppingItems: 'id, name, source, recipeId, checked, addedAt',
  recipesCache: 'id, cachedAt',
  settings: 'id'
});

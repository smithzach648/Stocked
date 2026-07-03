import { useState } from 'react';
import { CATEGORIES, UNITS } from '../../constants';
import {
  addPantryItem,
  updatePantryItem,
  deletePantryItem
} from '../../db/pantry';

const field =
  'w-full rounded-lg border border-sage bg-white px-3 py-2.5 text-ink';
const label = 'mb-1 block text-sm font-medium text-ink/80';

export default function ItemFormModal({ item, onClose }) {
  const editing = Boolean(item);
  const [form, setForm] = useState({
    name: item?.name ?? '',
    category: item?.category ?? 'Produce',
    quantity: item?.quantity ?? 1,
    unit: item?.unit ?? 'count',
    lowThreshold: item?.lowThreshold ?? ''
  });
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function save() {
    const name = form.name.trim();
    const quantity = Number(form.quantity);
    const lowThreshold =
      form.lowThreshold === '' ? null : Number(form.lowThreshold);

    if (!name) return setError('Give the item a name.');
    if (Number.isNaN(quantity) || quantity < 0)
      return setError('Quantity needs to be 0 or more.');
    if (lowThreshold !== null && (Number.isNaN(lowThreshold) || lowThreshold < 0))
      return setError('Low-stock alert needs to be 0 or more, or left blank.');

    const data = {
      name,
      category: form.category,
      quantity,
      unit: form.unit,
      lowThreshold
    };

    if (editing) await updatePantryItem(item.id, data);
    else await addPantryItem(data);
    onClose();
  }

  async function remove() {
    if (!confirmDelete) return setConfirmDelete(true);
    await deletePantryItem(item.id);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={editing ? `Edit ${item.name}` : 'Add pantry item'}
    >
      <div
        className="w-full max-w-lg rounded-t-2xl bg-paper p-5 pb-8 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-display text-xl font-semibold text-moss">
          {editing ? 'Edit item' : 'Add to pantry'}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={label} htmlFor="item-name">
              Name
            </label>
            <input
              id="item-name"
              className={field}
              value={form.name}
              onChange={set('name')}
              placeholder="Ground beef"
              autoFocus={!editing}
            />
          </div>

          <div>
            <label className={label} htmlFor="item-category">
              Category
            </label>
            <select
              id="item-category"
              className={field}
              value={form.category}
              onChange={set('category')}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={label} htmlFor="item-quantity">
                Quantity
              </label>
              <input
                id="item-quantity"
                className={field}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={form.quantity}
                onChange={set('quantity')}
              />
            </div>
            <div className="flex-1">
              <label className={label} htmlFor="item-unit">
                Unit
              </label>
              <select
                id="item-unit"
                className={field}
                value={form.unit}
                onChange={set('unit')}
              >
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={label} htmlFor="item-low">
              Low-stock alert at (optional)
            </label>
            <input
              id="item-low"
              className={field}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={form.lowThreshold}
              onChange={set('lowThreshold')}
              placeholder="e.g. 2 — flags Low at 2 or fewer"
            />
          </div>

          {error && <p className="text-sm font-medium text-brick">{error}</p>}

          <div className="mt-1 flex gap-3">
            {editing && (
              <button
                onClick={remove}
                className={`min-h-[48px] rounded-lg px-4 font-semibold transition-colors ${
                  confirmDelete
                    ? 'bg-brick text-paper'
                    : 'border border-brick/40 text-brick'
                }`}
              >
                {confirmDelete ? 'Tap again to delete' : 'Delete'}
              </button>
            )}
            <button
              onClick={save}
              className="min-h-[48px] flex-1 rounded-lg bg-moss font-semibold text-paper transition-transform active:scale-[0.99]"
            >
              {editing ? 'Save changes' : 'Add item'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

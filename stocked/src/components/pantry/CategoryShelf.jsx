import PantryItemRow from './PantryItemRow';

export default function CategoryShelf({ category, items, onEdit }) {
  return (
    <section aria-label={category}>
      <span className="shelf-label">{category}</span>
      <ul className="rounded-tr-md bg-white/70">
        {items.map((item) => (
          <PantryItemRow key={item.id} item={item} onEdit={onEdit} />
        ))}
      </ul>
      <div className="shelf-edge" aria-hidden="true" />
    </section>
  );
}

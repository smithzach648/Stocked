const TABS = [
  {
    id: 'pantry',
    label: 'Pantry',
    icon: (
      // jar
      <path d="M8 3h8v2.5c1.2.9 2 2.3 2 3.9V18a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9.4c0-1.6.8-3 2-3.9V3Zm2 2v1.6l-.9.5A2.9 2.9 0 0 0 8 9.4V18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9.4c0-1-.5-2-1.4-2.6l-.6-.4V5h-4Z" />
    )
  },
  {
    id: 'recipes',
    label: 'Recipes',
    icon: (
      // pot
      <path d="M4 9h16v2h-1v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6H4V9Zm3 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6H7Zm1-6.5 1.8 1L8 7.5 6.2 6.4 8 4.5Zm4 0 1.8 1-1.8 2-1.8-1.1 1.8-1.9Zm4 0 1.8 1-1.8 2-1.8-1.1 1.8-1.9Z" />
    )
  },
  {
    id: 'list',
    label: 'List',
    icon: (
      // checklist
      <path d="M9 5h11v2H9V5Zm0 6h11v2H9v-2Zm0 6h11v2H9v-2ZM4.2 6.6l1.4-1.4L7 6.6 5.6 8 4.2 6.6Zm0 6 1.4-1.4L7 12.6 5.6 14l-1.4-1.4Zm0 6 1.4-1.4L7 18.6 5.6 20l-1.4-1.4Z" />
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      // gear (simplified)
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-1.5-7h3l.5 2.6c.5.2 1 .4 1.4.8l2.5-.9 1.5 2.6-2 1.7a6 6 0 0 1 0 1.6l2 1.7-1.5 2.6-2.5-.9c-.4.3-.9.6-1.4.8L13.5 21h-3l-.5-2.6a6 6 0 0 1-1.4-.8l-2.5.9-1.5-2.6 2-1.7a6 6 0 0 1 0-1.6l-2-1.7 1.5-2.6 2.5.9c.4-.3.9-.6 1.4-.8L10.5 3Z" />
    )
  }
];

export default function TabBar({ active, onChange }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-sage bg-paper/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                isActive ? 'text-moss' : 'text-ink/50'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-current"
                aria-hidden="true"
              >
                {t.icon}
              </svg>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

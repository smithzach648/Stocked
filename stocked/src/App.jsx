import { useState } from 'react';
import AppHeader from './components/layout/AppHeader';
import TabBar from './components/layout/TabBar';
import PantryScreen from './components/pantry/PantryScreen';
import ComingSoon from './components/screens/ComingSoon';

const SCREENS = {
  pantry: <PantryScreen />,
  recipes: (
    <ComingSoon
      title="Recipes"
      note="Recipe search from your pantry arrives in Phase 2."
    />
  ),
  list: (
    <ComingSoon
      title="Shopping list"
      note="Auto-built shopping lists arrive in Phase 3."
    />
  ),
  settings: (
    <ComingSoon
      title="Settings"
      note="Store selection and price setup arrive in Phase 4."
    />
  )
};

export default function App() {
  const [tab, setTab] = useState('pantry');

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
      <AppHeader />
      <main className="flex-1 px-4 pb-28 pt-4">{SCREENS[tab]}</main>
      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

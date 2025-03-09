import React from 'react';
import {PokemonForm} from "./components/PokemonForm/PokemonForm.tsx";

const App: React.FC = () => {
  return (
      <div className="min-h-screen bg-luna-background py-8">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PokemonForm />
        </main>
      </div>
  );
};

export default App;
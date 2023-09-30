import React from 'react';
import CarouselComponent from './components/CarouselComponent';
import Header from './components/Header';
import VideoComponent from './components/Videos';

function App() {
  return (
    <main className="bg-blue-400 flex flex-col items-center gap-24">
      <h1 className="text-3xl font-semibold mt-5">Seja bem-vindo(a), lembre-se de sempre salvar suas alterações!</h1>
      <div className="App">
        <Header />
        <div className="mt-24">
          <VideoComponent />
        </div>

        <div className="mt-24">
          <CarouselComponent />
        </div>
      </div>
    </main>
  );
}

export default App;

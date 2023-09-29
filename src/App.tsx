
import CarouselComponent from './components/CarouselComponent';
import Header from './components/Header';
import VideoComponent from './components/Videos';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='mt-24'>
       <VideoComponent/>
      </div>

      <div className='mt-24'>
        <CarouselComponent/>
      </div>
    </div>
  );
}

export default App;

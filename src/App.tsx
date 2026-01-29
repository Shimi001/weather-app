import Header from "./components/layout/Header";
import WeatherCard from "./components/weatherCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex p-6">
        <WeatherCard />
      </main>
    </div>
  );
}

export default App;

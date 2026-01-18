import Logo from "./components/ui/Logo";
import WeatherCard from "./components/weather";

function App() {
  return (
    <>
      <header>
        <Logo />
      </header>

      <main>
        <WeatherCard />
      </main>
    </>
  );
}

export default App;

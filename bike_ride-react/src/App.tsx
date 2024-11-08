import Header from "./components/Header";
import ListNetwork from "./components/ListNetwork";
import ListStations from "./components/ListStations";

const App = () => (
  <div className="app">
    <Header />
    <main>
      <ListNetwork />
      <ListStations />
    </main>
  </div>
);

export default App;

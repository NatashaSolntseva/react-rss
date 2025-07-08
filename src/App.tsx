import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import CardList from './components/CardList/CardList';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-grow p-6">
        <SearchBar />
        <CardList />
      </main>

      <Footer />
    </div>
  );
}

export default App;

import { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import CardList from './components/CardList/CardList';
import { fetchLatestImages } from './api/api';

class App extends Component {
  componentDidMount() {
    fetchLatestImages()
      .then((images) => {
        console.log('Fetched images:', images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }

  render() {
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
}

export default App;

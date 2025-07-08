import { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import CardList from './components/CardList/CardList';
import { UnsplashImage, fetchLatestImages } from './api/api';

interface AppState {
  images: UnsplashImage[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: [],
    };
  }
  componentDidMount() {
    fetchLatestImages()
      .then((images) => {
        this.setState({ images });
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
          <CardList items={this.state.images} />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import CardList from './components/CardList/CardList';
import { UnsplashImage, fetchLatestImages, searchImages } from './api/api';

interface AppState {
  images: UnsplashImage[];
  loading: boolean;
  error: string | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      error: null,
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

  handleSearch = (term: string) => {
    this.setState({ loading: true });

    searchImages(term)
      .then((images) => {
        this.setState({ images, loading: false });
      })
      .catch((error) => {
        console.error('Search error:', error);
        this.setState({ error: 'Failed to search images', loading: false });
      });
  };

  render() {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Header />

        <main className="flex-grow p-6">
          <SearchBar onSearch={this.handleSearch} />
          <CardList items={this.state.images} />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;

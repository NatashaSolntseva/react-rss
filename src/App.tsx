import { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import CardList from './components/CardList/CardList';
import Loader from './components/Loader/Loader';
import { fetchLatestImages, searchImages } from './api/api';
import { UnsplashImage } from './api/types';
import ThrowErrorButton from './components/ThrowErrorButton/ThrowErrorButton';

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
    const savedTerm = localStorage.getItem('searchTerm');

    if (savedTerm && savedTerm.trim()) {
      this.setState({ loading: true });

      searchImages(savedTerm.trim())
        .then((images) => {
          this.setState({ images, loading: false });
        })
        .catch((error) => {
          console.error('Error fetching saved search:', error);
          this.setState({ error: 'Failed to load images', loading: false });
        });
    } else {
      this.setState({ loading: true });

      fetchLatestImages()
        .then((images) => {
          this.setState({ images, loading: false });
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
          this.setState({ error: 'Failed to load images', loading: false });
        });
    }
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
          <SearchBar
            onSearch={this.handleSearch}
            initialValue={localStorage.getItem('searchTerm') || ''}
          />
          <CardList items={this.state.images} />
          <ThrowErrorButton />
        </main>
        {this.state.loading && <Loader />}

        <Footer />
      </div>
    );
  }
}

export default App;

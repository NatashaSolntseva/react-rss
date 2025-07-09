import { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  term: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: e.target.value });
  };

  handleClick = () => {
    const trimmed = this.state.term.trim();
    if (trimmed) {
      this.props.onSearch(trimmed);
      localStorage.setItem('searchTerm', trimmed);
    }
  };

  render() {
    return (
      <div className="flex justify-center gap-2 mb-6">
        <input
          className="border rounded px-4 py-2 w-64"
          type="text"
          placeholder="Search for images..."
          value={this.state.term}
          onChange={this.handleChange}
        />
        <button
          className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;

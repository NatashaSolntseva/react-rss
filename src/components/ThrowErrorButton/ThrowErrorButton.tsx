import { Component } from 'react';

interface State {
  isError: boolean;
}

class ThrowErrorButton extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('This is a test error');
    }

    return (
      <div className="text-center mt-6">
        <button
          onClick={this.handleClick}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default ThrowErrorButton;

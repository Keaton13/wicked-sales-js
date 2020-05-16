import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './productDetails';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };

    this.setView = this.setView.bind(this);

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Testing connections...</h1>;
    } else {
      let view;
      if (this.state.view.name === 'details') {
        view = <ProductDetails params={this.state.view.params} setview={this.setView}/>;
      } else {
        view = <ProductList setView={this.setView}/>;
      }
      return (
        <div>
          <Header />
          { view }
        </div>
      );
    }
  }
}

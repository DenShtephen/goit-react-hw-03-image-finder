import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Services/Services';
import '../styles.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageUrl: '',
    totalHits: 0,
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleImageClick = image => {
    this.setState({ largeImageUrl: image.largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageUrl } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading &&
          images.length % 12 === 0 &&
          this.state.page <= Math.ceil(this.state.totalHits / 12) && (
            <Button onClick={this.handleLoadMore}>Load more</Button>
          )}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageUrl={largeImageUrl}
          />
        )}
      </div>
    );
  }
}

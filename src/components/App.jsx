import { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import '../styles.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageUrl: '',
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '38630454-b1080283bd37eb37a5f5742ac';
    const perPage = 12;

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
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
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages}>Load more</Button>
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

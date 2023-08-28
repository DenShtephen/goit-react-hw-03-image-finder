import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onItemClick }) => {
  return (
    <ul className="ImageGallery">
      {images.length > 0 ? (
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onItemClick={() => onItemClick(image)}
          />
        ))
      ) : (
        <p>No images found.</p>
      )}
    </ul>
  );
};

export const ImageGalleryItem = ({ image, onItemClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onItemClick}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

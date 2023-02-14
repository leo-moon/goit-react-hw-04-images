import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './image-gallery.module.scss';

const ImageGallery = ({ items, showBigImage }) => {
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem items={items} showBigImage={showBigImage} />
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = { items: [] };

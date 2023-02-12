import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './image-gallery.module.scss';

const ImageGallery = ({ items, showBigImage }) => {
  // console.log(showBigImage,"ImageGallery");
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem items={items} showBigImage={showBigImage} />
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = { items: [] };

import {memo} from 'react'

import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items, showBigImage }) => {
  if (items && items.length) {
    const elements = items.map(({ id, webformatURL, largeImageURL }) => (
      <li
        onClick={() => showBigImage({ largeImageURL })}
        key={id}
        className={styles.item}
      >
        <img className={styles.item__image} src={webformatURL} alt="nature" />
      </li>
    ));
    return <>{elements}</>;
  }
};

export default memo(ImageGalleryItem);

ImageGalleryItem.defaultProps = {
  items: [],
};

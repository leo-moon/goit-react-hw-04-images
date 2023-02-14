import { useState, useEffect, useCallback } from 'react';

import Modal from 'shared/components/Modal/Modal';
import ImageBig from './ImageBig/ImageBig';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { startImages } from '../../shared/services/image-api';
import { searchNewImages } from '../../shared/services/image-api';
import Button from './ButtonLoad/ButtonLoad';
import Loader from './Loader/Loader';

import './image-finder.module.scss';

const ImageFinder = () => {
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageBig, setImageBig] = useState(null);
  const [total, setTotal] = useState(0);
  const per_page = 12;
  const [items, setItems] = useState(() => {
    const fetchImagesStart = async () => {
      try {
        setLoading(true);
        const { data } = await startImages(per_page);
        const dataHits = [...data.hits] ? [...data.hits] : [];
        setTotal(data.totalHits);
        setItems([...dataHits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImagesStart();
  });

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const { data } = await searchNewImages(search, page, per_page);
          setItems(prevItems => [...prevItems, ...data.hits]);
          setTotal(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const changePage = () => {
    setPage(page + 1);
  };

  const showLoadButton = () => {
    if (total <= page * per_page) {
      return false;
    }
    return true;
  };

  const closeModal = () => {
    setShowModal(false);
    setImageBig(null);
  };

  const showBigImage = useCallback(({ largeImageURL }) => {
    setImageBig(largeImageURL);
    setShowModal(true);
  }, []);

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {error && <p>Something goes wrong</p>}

      {loading && <Loader />}
      {!loading && <ImageGallery items={items} showBigImage={showBigImage} />}

      {!loading && showLoadButton() && (
        <Button changePage={changePage}></Button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <ImageBig imageBig={imageBig} />
        </Modal>
      )}
    </>
  );
};

export default ImageFinder;

/*
class ImageFinder extends Component {
  state = {
    items: [],
    per_page: 12,
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    imageBig: null,
  };

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  changePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLoadButton = () => {
    const { total, page, per_page } = this.state;
    console.log(
      '77777777777777',
      total,
      page,
      per_page,
      total <= page * per_page
    );
    if (total <= page * per_page) {
      return false;
    }
    return true;
  };

  showBigImage = ({ largeImageURL }) => {
    console.log(largeImageURL);
    this.setState({
      imageBig: largeImageURL,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageBig: null,
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { per_page } = this.state;
    startImages(per_page)
      .then(({ data }) => {
        this.setState({ items: data.hits, total: data.totalHits });
      })
      .catch(error => {
        this.setState({ error: error.message });
        console.log(error.message);
      })
      .finally(this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, per_page, page } = this.state;
      const { data } = await searchNewImages(search, per_page, page);
      console.log(data);

      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { items, loading, error, showModal, imageBig } = this.state;
    const {
      searchImages,
      showLoadButton,
      changePage,
      showBigImage,
      closeModal,
    } = this;
    console.log('render', loading, { loading });
    return (
      <>
        <Searchbar onSubmit={searchImages} />
        {error && <p>Something goes wrong</p>}

        {loading && <Loader />}
        {!loading && <ImageGallery items={items} showBigImage={showBigImage} />}

        {!loading && showLoadButton() && <Button changePage={changePage}></Button>}
        {showModal && (
          <Modal close={closeModal}>
            <ImageBig imageBig={imageBig} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageFinder; //
*/

// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import initState from './initState';

import styles from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...search });
    // setSearch({ ...initState });
    setSearch('');
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    setSearch({ ...search, [name]: target.value }); //   ?
    // console.log(target,'handleChange', search, 'name', [name], 'v', value);
  };

  // const { search } = state;
  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          Search
        </button>

        <input
          onChange={handleChange}
          name="search"
          // value={search}
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

/*
class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(value)
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    console.log('handleSubmit', { ...this.state });
    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            Search
          </button>

          <input
            onChange={handleChange}
            name="search"
            value={search}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
*/

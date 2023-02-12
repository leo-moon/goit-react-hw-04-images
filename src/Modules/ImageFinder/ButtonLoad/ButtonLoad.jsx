import styles from './button-load.module.scss';

const Button = ({ changePage }) => {
  return (
    <>
      <button className={styles.button} onClick={changePage}>
        Load more
      </button>
    </>
  );
};

export default Button;

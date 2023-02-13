import { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

const modalAbove = document.querySelector('#modal-root');


// const Modal = () => {
//    componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     console.log('target', target);
//     console.log('currentTarget', currentTarget);
//     console.log(code, code === 'Escape');
//     if (target === currentTarget ||  code  === 'Escape') {
//       this.props.close();
//     }
//   };
  

  // render() {
  //   const { children, close } = this.props;
  //   console.log(close);
  //   const { closeModal } = this;
  //   return createPortal(
  //     <div className={styles.overlay} onClick={closeModal}>
  //       <div className={styles.modal}>{children}</div>
  //     </div>,
  //     modalAbove
  //   );
  // }
// }



// export default Modal;



class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    console.log('target', target);
    console.log('currentTarget', currentTarget);
    console.log(code, code === 'Escape');
    if (target === currentTarget ||  code  === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children, close } = this.props;
    console.log(close);
    const { closeModal } = this;
    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalAbove
    );
  }
}

export default Modal;

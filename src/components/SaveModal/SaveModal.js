import React, { PureComponent } from 'react';
import styles from './SaveModal.scss';
import Modal from '../../hoc/Modal/Modal';

class SaveModal extends PureComponent {
  state = {
    title: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    this.props.onClose(e);
    this.props.onSubmit(this.state.title);
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <form onSubmit={this.handleSubmit} className={styles.Form}>
          <label htmlFor='title'>Enter title:</label>
          <input id='title' name='title' type="text" onChange={this.handleChange} />
          <div className={styles.ButtonContainer}>
            <button onClick={this.props.onClose}>Cancel</button>
            <input type="submit" value="Save" disabled={!this.state.title} />
          </div>
        </form>
      </Modal>
    );
  }
}

export default SaveModal;
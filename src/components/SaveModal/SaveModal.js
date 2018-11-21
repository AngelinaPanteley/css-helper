import React, { PureComponent } from 'react';
import styles from './SaveModal.scss';
import Backdrop from '../UI/Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

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
    const attachedClasses = [styles.Modal];
    if (this.props.isOpen) {
      attachedClasses.push(styles.Open);
    } else {
      attachedClasses.push(styles.Close);
    }
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.isOpen}
          clicked={this.props.onClose}
          withBackground={true} />
        <div className={attachedClasses.join(' ')}>
          <form onSubmit={this.handleSubmit} className={styles.Form}>
            <label htmlFor='title'>Enter title:</label>
            <input id='title' name='title' type="text" onChange={this.handleChange} />
            <div className={styles.ButtonContainer}>
              <button onClick={this.props.onClose}>Cancel</button>
              <input type="submit" value="Save" disabled={!this.state.title} />
            </div>
          </form>
        </div>
      </Auxiliary>
    );
  }
}

export default SaveModal;
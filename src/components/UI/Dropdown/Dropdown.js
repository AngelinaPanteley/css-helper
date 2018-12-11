import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Dropdown.scss';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class Dropdown extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    left: PropTypes.bool,
    right: PropTypes.bool,
    links: PropTypes.array,
  }

  onLinkToClick = () => {
    this.props.onClose();

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onLinkClick = (e, link) => {
    e.preventDefault();
    this.onLinkToClick();
    link.click();
  }

  render() {
    const attachedClasses = [styles.Dropdown];

    if (this.props.isOpen) {
      attachedClasses.push(styles.Open);
    } else {
      attachedClasses.push(styles.Close);
    }

    if (this.props.left) {
      attachedClasses.push(styles.Left);
    } else if (this.props.right) {
      attachedClasses.push(styles.Right);
    }

    return (
      <Auxiliary>
        <Backdrop show={this.props.isOpen} clicked={this.props.onClose} />
        <div className={attachedClasses.join(' ')}>
          <ul className={styles.List}>
            {
              this.props.links && this.props.links.map((link) => {
                return (
                  <li key={link.title} className={styles.List_Item}>
                    {
                      link.route
                        ?
                        <Link to={link.route}
                          onClick={this.onLinkToClick}>
                          {link.title}
                        </Link>
                        :
                        <a onClick={(e) => this.onLinkClick(e, link)}>
                          {link.title}
                        </a>
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </Auxiliary>
    );
  }
};

export default Dropdown;
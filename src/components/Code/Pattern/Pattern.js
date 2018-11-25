import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './Pattern.scss';
import Icon from '../../UI/Icon/Icon';

class Pattern extends PureComponent {
  static propsTypes = {
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onCopy: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        <p className={styles.Title}>
          <span>{this.props.title}</span>
          <CopyToClipboard text={this.props.code}>
            <button className={styles.Button}
              onClick={this.props.onCopy}>
              <Icon icon="copy"></Icon>
            </button>
          </CopyToClipboard>
        </p>
        <pre className={styles.Pre}>
          <code className={styles.Code}>
            {this.props.code}
          </code >
        </pre>
      </div>
    )
  }
}

export default Pattern;
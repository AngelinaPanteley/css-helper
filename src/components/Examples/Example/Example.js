import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Example.scss';
import Preview from '../../Preview/Preview';

class Example extends PureComponent {
  static propsTypes = {
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    isSelected: PropTypes.bool.isRequired,
    selectExample: PropTypes.func.isRequired,
    exampleName: PropTypes.string.isRequired,
    template: PropTypes.string.isRequired,
    previewClass: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={this.props.isSelected ? styles.SelectedExample : styles.Example}
        onClick={() => this.props.selectExample(this.props.exampleName)}>
        <Preview template={this.props.template}
          previewClass={this.props.previewClass}
          styles={this.props.styles} />
        <p>{this.props.exampleName}</p>
      </div>
    )
  }
}

export default Example;
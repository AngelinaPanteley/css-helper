import React, { PureComponent } from 'react';
import styles from './Example.scss';
import Preview from '../../Preview/Preview';

class Example extends PureComponent {
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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Examples.scss';
import Example from './Example/Example';
import { calcStyles } from '../../shared/utility';

class Examples extends PureComponent {
  static propsTypes = {
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    examples: PropTypes.object.isRequired,
    initialControlValues: PropTypes.object.isRequired,
    controls: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    selectExample: PropTypes.func.isRequired,
    template: PropTypes.string.isRequired,
    previewClass: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedExample: null,
    }
  }

  selectExample = (exampleName) => {
    this.setState({
      selectedExample: exampleName,
    });
    this.props.selectExample(exampleName);
  }

  getExampleArray = () => {
    const examples = this.props.examples;
    const exampleArray = [];

    for (let exampleName in examples) {
      const controlValues = {
        ...this.props.initialControlValues,
        ...examples[exampleName],
      };

      const styles = calcStyles(this.props.styles, controlValues, this.props.controls);

      exampleArray.push(
        <Example key={exampleName}
          template={this.props.template}
          previewClass={this.props.previewClass}
          styles={styles}
          exampleName={exampleName}
          selectExample={this.selectExample}
          isSelected={exampleName === this.state.selectedExample} />
      );
    }

    return exampleArray;
  }

  render() {
    const examplesStyles = [styles.Examples];

    if (this.props.isOpen) {
      examplesStyles.push(styles.Open);
    } else {
      examplesStyles.push(styles.Close);
    }

    return (
      <div className={examplesStyles.join(' ')}>
        {this.getExampleArray()}
      </div>
    )
  }
}

export default Examples;
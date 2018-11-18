import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from './Editor.scss';
import { calcStyles } from '../../shared/utility';

import Tabs from '../../components/UI/Tabs/Tabs';
import Generator from '../../components/Generator/Generator';
import Preview from '../../components/Preview/Preview';
import Code from '../../components/Code/Code';
import Examples from '../../components/Examples/Examples';

class Editor extends PureComponent {
  constructor(props) {
    super(props);

    const controls = props.settings.controls;
    const controlValues = {};

    for (let name in controls) {
      const control = controls[name];
      controlValues[name] = control.initialValue;
    };

    const styleValues = calcStyles(props.settings.style, controlValues, controls);

    this.state = {
      controlValues,
      initialControlValues: controlValues,
      styleValues,
      initialStyleValues: styleValues,
      isExamplesOpen: true,
    }
  }

  handleChange = (control, value) => {
    this.setState({
      controlValues: {
        ...this.state.controlValues,
        [control]: value,
      }
    });

    this.changeStyles();
  }

  changeStyles = () => {
    const settings = this.props.settings;

    this.setState((prevState) => {
      return {
        styleValues: calcStyles(settings.style, prevState.controlValues, settings.controls),
      }
    });
  }

  toggleExamples = (e) => {
    e.preventDefault();
    this.setState({
      isExamplesOpen: !this.state.isExamplesOpen,
    })
  }

  selectExample = (exampleName) => {
    const example = this.props.settings.examples[exampleName];

    this.setState({
      controlValues: {
        ...this.state.initialControlValues,
        ...example,
      }
    });
    this.changeStyles();
  }

  render() {
    const settings = this.props.settings;
    return (
      <div className={styles.Editor}>
        <div className={styles.PreviewContainer}>
          <Examples isOpen={this.state.isExamplesOpen}
            previewClass={settings.className}
            template={settings.template}
            examples={settings.examples}
            initialControlValues={this.state.initialControlValues}
            styles={settings.style}
            controls={settings.controls}
            selectExample={this.selectExample} />
          <a href="" onClick={this.toggleExamples} className={styles.ToggleLink}>
            {
              this.state.isExamplesOpen
                ?
                'Hide Exampless'
                :
                'Show Examples'
            }
          </a>
          <div className={styles.Preview}>
            <Preview
              previewClass={settings.className}
              template={settings.template}
              styles={this.state.styleValues} />
          </div>
          <button>Save</button>
        </div>
        <div className={styles.TabsContainer}>
          <Tabs tabs={['Generator', 'Code']}>
            <Generator
              controls={settings.controls}
              controlValues={this.state.controlValues}
              handleChange={this.handleChange} />
            <Code
              previewClass={settings.className}
              template={settings.template}
              styles={this.state.styleValues} />
          </Tabs>
        </div>
      </div >
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     config: state
//   }
// }

export default Editor;
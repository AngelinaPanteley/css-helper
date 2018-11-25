import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './OpenedSavingItem.scss';
import { calcStyles } from '../../shared/utility';
import Preview from '../../components/Preview/Preview';
import Pattern from '../../components/Code/Pattern/Pattern';

class OpenedSavingItem extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    openHint: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.settings = this.props.settings[this.props.item.editorName];
    this.previewClass = this.settings.className;

    this.state = {
      styleValues: calcStyles(
        this.settings.style,
        props.item.controlValues,
        this.settings.controls
      ),
    }
  }

  openCopyHint = () => {
    this.props.openHint('Copied.');
  }

  render() {
    const wrapperStyles = [styles.Wrapper];
    if (this.props.isOpen) {
      wrapperStyles.push(styles.Open);
    } else {
      wrapperStyles.push(styles.Close);
    }

    let styleString = '';
    for (let styleKey in this.state.styleValues) {
      styleString = `${styleString}\n  ${styleKey}: ${this.state.styleValues[styleKey]};`;
    }
    const styleCode = `.${this.previewClass} {${styleString}\n}`;

    return (
      <div className={wrapperStyles.join(' ')}>
        <div className={styles.Pattern}>
          <Pattern code={styleCode}
            title='Styles'
            onCopy={this.openCopyHint}
          />
        </div>
        <div className={styles.Preview}>
          <Preview
            previewClass={this.settings.className}
            template={this.settings.template}
            styles={this.state.styleValues} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.editors.settings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openHint: (text) => {
      dispatch(actions.openHint(text));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedSavingItem);
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Code.scss';
import Pattern from './Pattern/Pattern';

class Code extends PureComponent {
  static propsTypes = {
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    previewClass: PropTypes.string.isRequired,
    onCopy: PropTypes.func.isRequired,
    template: PropTypes.string.isRequired,
  }

  render() {
    let styleString = '';
    const propStyles = this.props.styles;

    for (let styleKey in propStyles) {
      styleString = `${styleString}\n  ${styleKey}: ${propStyles[styleKey]};`;
    }

    const styleCode = `.${this.props.previewClass} {${styleString}\n}`;

    return (
      <div className={styles.CodeWrapper}>
        <Pattern code={styleCode}
          title='Styles'
          onCopy={this.props.onCopy}
        />
        <Pattern code={this.props.template.replace(/\n/, "\n\u00a0\u00a0")}
          title='Markup'
          onCopy={this.props.onCopy}
        />
      </div>
    )
  }
}

export default Code;
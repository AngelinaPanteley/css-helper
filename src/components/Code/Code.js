import React, { PureComponent } from 'react';
import styles from './Code.scss';
import Pattern from './Pattern/Pattern';

class Code extends PureComponent {
  render() {
    let styleString = '';
    for (let styleKey in this.props.styles) {
      styleString = `${styleString}\n  ${styleKey}: ${this.props.styles[styleKey]};`;
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
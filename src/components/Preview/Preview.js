import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Preview extends PureComponent {
  componentDidMount() {
    this.setStyles();
  }

  componentDidUpdate() {
    this.setStyles();
  }

  createMarkup = () => {
    return { __html: this.props.template };
  }

  setStyles = () => {
    const previewClass = this.props.previewClass;
    const element = ReactDOM.findDOMNode(this.refs.wrapper)
      .getElementsByClassName(previewClass).item(previewClass);

    for (let styleKey in this.props.styles) {
      element.style[styleKey] = this.props.styles[styleKey];
    }
  }

  render() {
    return (
      <div ref="wrapper"
        dangerouslySetInnerHTML={this.createMarkup()} >
      </div>
    );
  }
}

export default Preview;
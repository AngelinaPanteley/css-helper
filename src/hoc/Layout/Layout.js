import React, { PureComponent } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Header from '../../components/Header/Header';

class Layout extends PureComponent {
  render() {
    return (
      <Auxiliary>
        <Header />
        {this.props.children}
      </Auxiliary>
    )
  }
}

export default Layout;
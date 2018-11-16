import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from './Editor.scss';

import Tabs from '../../components/UI/Tabs/Tabs';

class Editor extends PureComponent {
  render() {
    return (
      <div className={styles.Editor}>
        <div className={styles.PreviewContainer}>
          <div>Templates</div>
          <div>Preview</div>
          <button>Save</button>
        </div>
        <div className={styles.TabsContainer}>
          <Tabs tabs={['Generator', 'Code']}>
            <div>Generator inner</div>
            <div>Code inner</div>
          </Tabs>
        </div>
        {/*this.props.settings.controls.contrast.label*/}
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     config: state
//   }
// }

export default Editor;
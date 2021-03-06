import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Savings.scss';
import * as actions from '../../store/actions/index';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ShowBy from '../../components/List/ShowBy/ShowBy';
import SavingList from '../../components/List/SavingList/SavingList';
import Breadcrumbs from '../../components/List/Breadcrumbs/Breadcrumbs';
import DeleteConfirmationModal from '../../components/List/SavingList/DeleteConfirmationModal/DeleteConfirmationModal';

class Savings extends PureComponent {
  static propTypes = {
    savings: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    userId: PropTypes.string,
    token: PropTypes.string,
    getSavings: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    turnEditingModeOn: PropTypes.func.isRequired,
  }

  state = {
    savings: null,
    deleteItemId: null,
    isConfirmationModalOpen: false,
  }

  componentDidMount() {
    const { userId, token } = this.props;
    this.props.getSavings(userId, token);
    this.getParams();
  }

  componentDidUpdate(prevProps) {
    const match = this.props.match.params;
    const prevMatch = prevProps.match.params;

    if (match.showBy !== prevMatch.showBy ||
      match.pageNumber !== prevMatch.pageNumber ||
      match.itemId !== prevMatch.itemId) {
      this.getParams();
    }

    if (!this.state.savings &&
      this.props.savings &&
      this.props.savings !== prevProps.savings) {
      const savings = [];
      const keys = Object.keys(this.props.savings);

      keys.forEach((key) => {
        savings.push({
          ...this.props.savings[key],
          id: key,
        });
      })

      savings.sort((a, b) => {
        if (a.data < b.data) {
          return 1;
        }
        if (a.data > b.data) {
          return -1;
        }
        return 0;
      });

      this.setState({
        savings: savings,
      })
    }
  }

  getParams = () => {
    const { showBy, pageNumber, itemId } = this.props.match.params;

    if (!+showBy || !+pageNumber) {
      this.props.history.push('/');
      return;
    }

    this.setState({
      showBy: +showBy,
      pageNumber: +pageNumber,
      itemId: itemId,
    })
  }

  changeShowBy = (newValue) => {
    this.setState({
      showBy: newValue,
      pageNumber: 1,
    })

    this.props.history.push(`/savings/${newValue}/1`);
    localStorage.setItem('showBy', newValue);
  }

  changePageNumber = (newValue) => {
    this.setState({
      pageNumber: newValue,
    })

    this.props.history.push(`/savings/${this.state.showBy}/${newValue}`);
  }

  editSavingItem = (id) => {
    const saving = this.state.savings.filter((item) => {
      return item.id === id;
    })[0];

    localStorage.setItem(saving.editorName, JSON.stringify(saving.controlValues));
    this.props.turnEditingModeOn(id, saving.title);
    this.props.history.push(`/${saving.editorName}`);
  }

  openConfirmationModal = (id) => {
    this.confirmationModalToggle();

    this.setState({
      deleteItemId: id,
    });
  }

  deleteSavingItem = () => {
    const savings = this.state.savings;
    const id = this.state.deleteItemId;
    const index = savings.findIndex((item) => {
      return item.id === id;
    });

    const newArray = [...savings.slice(0, index), ...savings.slice(index + 1)];

    this.setState({
      savings: newArray,
    })

    this.props.delete(id, this.props.token);
    this.confirmationModalToggle();
  }

  confirmationModalToggle = () => {
    this.setState({
      isConfirmationModalOpen: !this.state.isConfirmationModalOpen,
    });
  }

  toggleSavingItem = (id) => {
    const { showBy, pageNumber } = this.state;

    if (this.state.itemId === id) {
      this.setState({
        itemId: null,
      });
      this.props.history.push(`/savings/${showBy}/${pageNumber}`);
    } else {
      this.setState({
        itemId: id,
      });
      this.props.history.push(`/savings/${showBy}/${pageNumber}/${id}`);
    }
  }

  render() {
    const { savings, showBy, pageNumber, itemId } = this.state;
    let length = 0;

    if (savings) {
      length = savings.length;
    }

    const startIndex = showBy * (pageNumber - 1);
    const lastIndex = startIndex + showBy;

    return (
      <Auxiliary>
        {
          this.props.loading && !savings
            ?
            <Spinner />
            :
            (
              length
                ?
                <div className={styles.Wrapper}>
                  <ShowBy
                    value={showBy}
                    onChange={this.changeShowBy}
                    length={length}
                  />
                  <SavingList
                    items={savings.slice(startIndex, lastIndex)}
                    openItem={itemId}
                    onEdit={this.editSavingItem}
                    onDelete={this.openConfirmationModal}
                    onClick={this.toggleSavingItem}
                  />
                  <Breadcrumbs
                    pageAmount={Math.ceil(length / showBy)}
                    pageNumber={pageNumber}
                    onChange={this.changePageNumber}
                  />
                  <DeleteConfirmationModal
                    isOpen={this.state.isConfirmationModalOpen}
                    onClose={this.confirmationModalToggle}
                    onConfirm={this.deleteSavingItem}
                  />
                </div>
                :
                <p className={styles.Title}>You have no savings.</p>
            )
        }
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    savings: state.saving.savings,
    loading: state.saving.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavings: (userId, token) => {
      dispatch(actions.getSavings(userId, token));
    },
    delete: (id, token) => {
      dispatch(actions.deleteSaving(id, token));
    },
    turnEditingModeOn: (id, title) => {
      dispatch(actions.turnEditingModeOn(id, title));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Savings));
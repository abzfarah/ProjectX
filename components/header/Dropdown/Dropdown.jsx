import React, { Component, PropTypes } from 'react';
import DropdownList from '../DropdownList';
import DropdownHighlight from '../DropdownHighlight';
import styles from './Dropdown.styl';
import classNames from 'classnames/bind';

const cx = styles::classNames;

class Dropdown extends Component {
  static propTypes = {
    data: PropTypes.object,
    closeDropdowns: PropTypes.func,
    open: PropTypes.bool
  }

  static defaultProps = {
    data: {}
  }

  state = {
    highlight: {}
  }

  componentWillMount() {
    const { data } = this.props;
    // Set highlight object to default highlight of the dropdown
    const highlightComponent = data.childrens.filter(component => !!component.default);

    if (!highlightComponent.length) return;

    this.setState({ highlight: highlightComponent[0].default });
  }

  highlightHandler = highlight => {
    if (!highlight) return;
    this.setState({ highlight });
  }

  render() {
    const { data, closeDropdowns, open } = this.props;

    return (
      <div
        className={cx('dropdown', data.dropdownClass, {
          'is-open': open
        })}
      >
        {data.childrens.map(component => {
          switch (component.componentType) {
            case 'list':
              return (
                <DropdownList
                  key={component.key}
                  data={component}
                  parentClass={data.dropdownClass}
                  highlightHandler={this.highlightHandler}
                  closeDropdowns={closeDropdowns}
                />
              );
            case 'highlight':
              return (
                <DropdownHighlight
                  key={component.key}
                  data={this.state.highlight}
                  parentClass={data.dropdownClass}
                  closeDropdowns={closeDropdowns}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }
}

export default Dropdown;

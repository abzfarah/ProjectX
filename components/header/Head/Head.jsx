import React, { PropTypes } from 'react';
import styles from './Head.styl';
import classNames from 'classnames/bind';

const cx = styles::classNames;

const Head = ({
  toggleDropdownHandler,
  featured,
  featuredLink,
  featuredText,
  dropdownOpen,
  theme,
  closeHeaderDropdown
}) =>
  <div
    className={cx('head', [`theme-${theme}`], {
      dropdownOpen
    })}
  >
    <button
      type="button"
      className={cx('toggleButton', 'collapsed', { closeButton: dropdownOpen })}
      onClick={toggleDropdownHandler}
    >
      <span className="sr-only">Toggle navigation</span>
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
    </button>
    <h1 className={cx('brand')}>
      <a href="/" rel="home" className={cx('logo')} onClick={closeHeaderDropdown}>
        <span>Auth0</span>
      </a>
      {featured
        ?
        <a
          href={featuredLink}
          className={cx('hiring', 'animated', 'bounce')}
          onClick={closeHeaderDropdown}
          rel="external"
        >{featuredText}</a>
        : null
      }
    </h1>
  </div>;

Head.propTypes = {
  toggleDropdownHandler: PropTypes.func,
  featured: PropTypes.bool,
  featuredLink: PropTypes.string,
  featuredText: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  theme: PropTypes.string,
  closeHeaderDropdown: PropTypes.func
};

export default Head;

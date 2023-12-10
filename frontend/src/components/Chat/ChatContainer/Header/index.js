import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind({ ...styles, container: 'container' });

function Header() {
  const userOnline = useSelector((state) => state.userOnline);
  return (
    <>
      {userOnline ? (
        <div className={cx('header')}>
          <div className={cx('header-image')}>
            <img src={userOnline.userAvatarUrl} alt="User Avatar" />
          </div>
          <h3>{userOnline.userName}</h3> 
          <p>{userOnline?.id}</p> 

        </div>
      ) : null}
    </>
  );
}

export default Header;
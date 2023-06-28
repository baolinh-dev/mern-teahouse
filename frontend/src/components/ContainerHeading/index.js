import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContainerHeading.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind({ ...styles, container: 'container' });

function ContainerHeading({ children, center, left, right }) {
    return (
        <div
            className={cx('container-heading', {
                center: center,
                left: left,
                right: right,
            })}
        >
            {children}
        </div>
    );
}

export default ContainerHeading;

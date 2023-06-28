import classNames from 'classnames/bind';
import styles from './TitleFooter.module.scss';

const cx = classNames.bind({ ...styles, 'container': 'container' });

function TitleFooter({content}) {
    return (   
        <div className={cx('title-footer')}>
            <h4>{content}</h4>
        </div>
    );
}

export default TitleFooter;
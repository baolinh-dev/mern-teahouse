import classNames from 'classnames/bind';
import styles from './TimeOpening.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
// col-xl-7 col-lg-7 col-12 left
const cx = classNames.bind({
    ...styles,
    container: 'container',
    'col-xl-7': 'col-xl-7',
    'col-lg-7': 'col-lg-7',
    'col-12': 'col-12',
    row: 'row',
});

function TimeOpening() {
    return (
        <div className={cx('time-opeing', 'container')}>
            <div className="row">
                <div className={cx('col-xl-7', 'col-lg-7', 'col-12')}>
                    <div className={cx('left-module')}>
                        <ContainerHeading left>
                            <Heading content={'Thời gian mở cửa'} color={"white"}/>
                        </ContainerHeading>
                        <div className={cx('content-module')}>
                            <p>
                                “Cà phê nhé" - Một lời hẹn rất riêng của người Việt. Một lời ngỏ mộc mạc để mình ngồi
                                lại bên nhau và sẻ chia câu chuyện của riêng mình.
                            </p>
                            <span className={cx('time')}>T2 - T6: 8h30 - 21h30</span>
                            <span className={cx('time')}>T7 - CN: 8h00 - 22h00</span>
                            <a href="/" title="Đặt bàn ngay">
                                Đặt bàn ngay
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx('col-xl-5', 'col-lg-5', 'col-12')}>
                    <div className={cx('right-module')}></div>
                </div>
            </div>
        </div>
    );
}

export default TimeOpening;

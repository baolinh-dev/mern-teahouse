import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import InforItem from './InforItem';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '~/layouts/MainLayout';
const cx = classNames.bind({ ...styles, container: 'container' });

function Contact() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Liên hệ', active: true },
    ];
    const inforItems = [
        {
            icon: faLocationDot,
            label: 'Địa chỉ',
            text: 'Tâng 6 toà nhà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội',
        },
        {
            icon: faEnvelope,
            label: 'Email',
            text: 'baolinhdev@gmail.com',
        },
        {
            icon: faPhone,
            label: 'Hotline',
            text: '0768494121',
        },
    ];
    return (
        <>
            <MainLayout>
                <div className={cx('contact', 'container')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <div className={cx('content')}>
                        <div className={cx('map')}>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7333963918322!2d108.24978007500276!3d15.975293084690664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology.!5e0!3m2!1sen!2s!4v1687972021418!5m2!1sen!2s"
                                width="560"
                                height="320"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className={cx('infor')}>
                            <ContainerHeading left>
                                <Heading content={'Hãy liên hệ với chúng tôi'} />
                            </ContainerHeading>
                            <div className={cx('desc')}>
                                Hãy liên hệ ngay với chúng tôi để nhận được nhiều ưu đãi hấp dẫn dành cho bạn!
                            </div>
                            {inforItems.map((item, index) => (
                                <InforItem key={index} icon={item.icon} label={item.label} text={item.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Contact;

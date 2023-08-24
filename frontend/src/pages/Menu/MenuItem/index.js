import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import ProductItem from '~/components/ProductItem';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function MenuItem({ contentHeading, desc, listItem }) {
    
    return (
        <div className={cx('menu-item')}>
            <div className={cx('title')}>
                <ContainerHeading center>
                    <Heading content={contentHeading} />
                </ContainerHeading>
            </div>
            <div className={cx('desc')}>
                <p>{desc}</p>
            </div>
            <div className={cx('list')}>
                {listItem.map((product) => (
                    <ProductItem
                        key={product._id}
                        imageUrl={product.images[0].url}
                        price={product.price}
                        nameProduct={product.name}
                        id={product._id} 
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default MenuItem;
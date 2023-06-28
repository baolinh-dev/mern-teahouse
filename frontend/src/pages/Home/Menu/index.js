import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { useState } from 'react';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind({ ...styles, container: 'container' });

const tabtitles = [
    {
        content: 'Cà phê',
        data: [
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/16.jpg?v=1608879290037',
                nameProduct: 'Latte',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/14.jpg?v=1608879192287',
                nameProduct: 'Espresso',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/15.jpg?v=1608879124267',
                nameProduct: 'Cappuccino',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/13.jpg?v=1608878981920',
                nameProduct: 'Caramel Macchiato',
                price: 55000,
            },
        ],
    },
    {
        content: 'Bánh ngọt',
        data: [
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/20.jpg?v=1608880067563',
                nameProduct: 'Bánh cà phê phomai',
                price: 25000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/19.jpg?v=1608880031067',
                nameProduct: 'TIRAMISU',
                price: 25000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/18.jpg?v=1608879997587',
                nameProduct: 'Caramel Phomai',
                price: 25000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/17.jpg?v=1608879652617',
                nameProduct: 'Bông lan cuộn trà xanh',
                price: 25000,
            },
        ],
    },
    {
        content: 'Smoothies',
        data: [
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/4.jpg?v=1608879593660',
                nameProduct: 'Smoothies chuối dừa',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/3.jpg?v=1608879476030',
                nameProduct: 'Smoothies dâu việt quất',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/2.jpg?v=1608879444317',
                nameProduct: 'Smoothies dâu',
                price: 55000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/1.jpg?v=1608879356303',
                nameProduct: 'Smoothies dâu chuối',
                price: 55000,
            },
        ],
    },
    {
        content: 'Trà hoa quả',
        data: [
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/6.jpg?v=1608878870957',
                nameProduct: 'Trà phúc bồn tử',
                price: 40000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/12.jpg?v=1608878605447',
                nameProduct: 'Trà vải',
                price: 40000,
            },
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/11-31738fc1-8b94-4d06-824d-63222f59e4e0.jpg?v=1608871602993',
                nameProduct: 'Trà cam đào',
                price: 45000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/9.jpg?v=1608871302813',
                nameProduct: 'Trà táo',
                price: 35000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/5.jpg?v=1608878814310',
                nameProduct: 'Trà việt quất',
                price: 40000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/7.jpg?v=1608872409047',
                nameProduct: 'Trà dây tây',
                price: 40000,
            },
            {
                imageUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/8.jpg?v=1608871359567',
                nameProduct: 'Trà xoài',
                price: 35000,
            },
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/10-a1db977e-32af-492b-8ae1-c3638939b4a7.jpg?v=1608871257547',
                nameProduct: 'Trà chanh',
                price: 30000,
            },
        ],
    },
    {
        content: 'Trà sữa',
        data: [
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/08839e8c32c72f41018a8f1f2a8820.jpg?v=1608870358943',
                nameProduct: 'Trà sữa hạt dẻ',
                price: 45000,
            },
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/1172b16683c3bd4c4f9ba2f9b2a5dc.jpg?v=1608870353207',
                nameProduct: 'Trà sữa khoai môn',
                price: 45000,
            },
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/04de27bf4e5fa74517a79694b7d46d.jpg?v=1608870352567',
                nameProduct: 'Trà sữa Kiwi',
                price: 32000,
            },
            {
                imageUrl:
                    'https://bizweb.dktcdn.net/thumb/large/100/415/010/products/09a09e1b97407c42d980709d9b52ff.jpg?v=1608870351573',
                nameProduct: 'Trà sữa dưa leo',
                price: 32000,
            },
        ],
    },
];

function Menu() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    return (
        <div className={cx('menu')}>
            <ContainerHeading center>
                <Heading content={'Menu hôm nay'} />
            </ContainerHeading>
            <div className={cx('tabs-title')}>
                <ul>
                    {tabtitles.map((tabtitle, index) => (
                        <li key={index} onClick={() => handleTabClick(index)}>
                            {tabtitle.content}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('products', 'container')}>
                {tabtitles[selectedTab].data.map((product, index) => (
                    <ProductItem
                        key={index}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        nameProduct={product.nameProduct}
                    />
                ))}
            </div>
        </div>
    );
}

export default Menu;

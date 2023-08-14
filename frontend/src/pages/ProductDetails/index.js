import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import Footer from '~/components/Footer';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCake, faStar, faStarAndCrescent, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container', row: 'row' });

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [reviews, setReviews] = useState([]);
    const [commentForm, setCommentForm] = useState({ rating: '', comment: '' });
    const pathname = window.location.pathname;
    const productId = pathname.substring(pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/v1/product/${productId}`);
            setProduct(res.data.product);
            console.log('Product:', res.data.product);
        };
        fetchProduct();
        console.log('Đây là id: ', productId);
    }, [productId]);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get(`/api/v1/reviews?productId=${productId}`);
            setReviews(res.data.reviews);
            console.log('Reviews:', res.data.reviews);
        };
        fetchReviews();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        const newItem = {
            id: product._id,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            quantity: quantity,
        };
        const itemIndex = cart.findIndex((item) => item.id === product._id);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[itemIndex].quantity += quantity;
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            setCart([...cart, newItem]);
            localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
        }
        window.location.reload();
    };

    const handleRatingChange = (value) => {
        setCommentForm({ ...commentForm, rating: value });
    };

    const handleCommentChange = (event) => {
        setCommentForm({ ...commentForm, comment: event.target.value });
    };
    const handleSubmitComment = async () => {
        try {
            const response = await axios.put('/api/v1/review', {
                rating: commentForm.rating,
                comment: commentForm.comment,
                productId: productId,
            });
            // Handle the response, e.g., display a success message
            console.log('Comment submitted:', response.data);

            // Clear the comment form
            setCommentForm({ rating: '', comment: '' });
            window.location.reload();
        } catch (error) {
            // Handle the error, e.g., display an error message
            console.error('Error submitting comment:', error);
        }
    };
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: product.category, link: '/caphe' },
        { label: product.name, active: true },
    ];

    return (
        <>
            <Header />
            <div className={cx('bg-product')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('product-item')}>
                            <Breadcrumb items={breadcrumbItems} />
                            <div className={cx('product-item-content')}>
                                <div className={cx('product-item-left')}>
                                    <div className={cx('product-image')}>
                                        <img src={product.images[0].url} />
                                    </div>
                                </div>
                                <div className={cx('product-item-right')}>
                                    <div className={cx('title')}>
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className={cx('desc')}>
                                        <p>
                                            <span>Mô tả: </span> {product.description}
                                        </p>
                                    </div>
                                    <div className={cx('ratings')}>
                                        {reviews.length > 0 ? (
                                            <Rating
                                                className={cx('stars')}
                                                initialRating={product.ratings}
                                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                                fullSymbol={<FontAwesomeIcon icon={faStar} color="#ffc107" />}
                                                readonly
                                            />
                                        ) : (
                                            <Rating
                                                className={cx('stars')}
                                                initialRating={product.ratings}
                                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                                readonly
                                            />
                                        )}
                                        <div className={cx('ratings-number')}>
                                            <h4>Số lượng đánh giá: </h4>
                                            <p>{product.numOfReviews}</p>
                                        </div>
                                    </div>
                                    <div className={cx('price-calculator')}>
                                        <div className={cx('price')}>
                                            <span>Giá: </span>{' '}
                                            <p>
                                                {product.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </p>
                                        </div>
                                        <div className={cx('quantity')}>
                                            <span>Số lượng: </span>
                                            <button type="button" onClick={handleDecrement}>
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={quantity}
                                                min="1"
                                                onChange={handleQuantityChange}
                                            />
                                            <button type="button" onClick={handleIncrement}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('total')}>
                                        <span>Tổng: </span>{' '}
                                        <p>
                                            {(product.price * quantity).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </p>
                                    </div>
                                    <div className={cx('buttons')}>
                                        <button onClick={handleAddToCart} target="_self">
                                            Thêm vào giỏ hàng
                                        </button>
                                        <button className={cx('highlight')}>
                                            <a href="/">Mua ngay</a>
                                        </button>
                                    </div>
                                    <div className={cx('shipping-infor')}>
                                        <p>
                                            <b>Giao hàng miễn phí: </b>
                                            Áp dụng đơn hàng &gt;200.000đ
                                        </p>
                                        <p>
                                            <b>Thanh toán tại nhà: </b>
                                            Nhanh chóng và an toàn
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('comments', 'container')}>
                    <h3 className={cx('comments-title')}>bình luận</h3>
                    <div className={cx('comments-container')}>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className={cx('comment-item')}>
                                    <div className={cx('comment-info')}>
                                        <div className={cx('comment-avatar')}>
                                            <div className={cx('comment-avatar')}>
                                                <img
                                                    src={
                                                        review.avatar ||
                                                        'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3a%2f%2fshackmanlab.org%2fwp-content%2fuploads%2f2013%2f07%2fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
                                                    }
                                                    alt="User Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('comment-name')}>
                                            <p>{review.name}</p>
                                        </div>
                                    </div>
                                    <div className={cx('comment-content')}>
                                        <div className={cx('comment-rating')}>
                                            <Rating
                                                initialRating={review.rating}
                                                emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                                fullSymbol={<FontAwesomeIcon icon={faStar} color="#ffc107" />}
                                                readonly
                                            />
                                        </div>
                                        <div className={cx('comment-text')}>
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có bình luận nào</p>
                        )}
                        <h3 className={cx('comments-title')}>Đánh giá</h3>
                        <div className={cx('comment-form')}>
                            <div className={cx('comment-rating')}>
                                <label>Rating : </label>
                                <Rating
                                    initialRating={commentForm.rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} color="#ffc107" />}
                                    onChange={handleRatingChange}
                                />
                            </div>
                            <div className={cx('comment-text')}>
                                <textarea
                                    placeholder="Nhập bình luận của bạn..."
                                    value={commentForm.comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                            <button onClick={handleSubmitComment}>
                                <span>Gửi bình luận</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import { faCartShopping, faFileInvoice, faUsers } from '@fortawesome/free-solid-svg-icons'; 

import classNames from 'classnames/bind';
import styles from './Cards.module.scss';
const cx = classNames.bind({ ...styles, container: 'container' });

function Cards() {
  const [productCount, setProductCount] = useState(null); 
  const [orderCount, setOrderCount] = useState(null); 
  const [userCount, setUserCount] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/products');
        const { productCount } = response.data; 
        setProductCount(productCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/admin/orders?page=all');
        const { orders } = response.data; 
        setOrderCount(orders.length);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/admin/users?page=all');
        const { users } = response.data; 
        setUserCount(users.length);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className={cx('cards')}> 
      <CardItem icon={faCartShopping} quantity={productCount} heading={"Products"} /> 
      <CardItem icon={faFileInvoice} quantity={orderCount} heading={"Orders"} /> 
      <CardItem icon={faUsers} quantity={userCount} heading={"Users"} /> 
    </div>
  );
}

export default Cards;
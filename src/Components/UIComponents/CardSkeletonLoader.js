import React from 'react';
import '../Styles/CardSkeletonLoader.css';

const CardSkeletonLoader = () => {
  return (
    <div className='card-skeleton-loader'>
      <div className='card-skeleton-loader__header'></div>
        <div className='card-skeleton-loader__body'>
            <div className='card-skeleton-loader__description'></div>
            <div className='card-skeleton-loader__description'></div>
            <div className='card-skeleton-loader__description'></div>
        </div>
    </div>
  )
}

export default CardSkeletonLoader

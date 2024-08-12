import React from 'react';
import '../Styles/ViewWorkoutSkeletonLoader.css';

const ViewWorkoutSkeletonLoader = () => {
  return (
    <div className='view-workout-skeleton-loader'>
        <div className='view-workout-skeleton-loader__video-wrapper'>
        </div>
        <div className='view-workout-skeleton-loader__details-wrapper'>
            <div className='view-workout-skeleton-loader__details'></div>
            <div className='view-workout-skeleton-loader__details'></div>
            <div className='view-workout-skeleton-loader__details'></div>
        </div>
    </div>
  )
}

export default ViewWorkoutSkeletonLoader

import React from 'react';
import '../Styles/CatalogCardComponent.css';
import { Link } from 'react-router-dom';

const CatalogCardComponent = ({id, img, name, description, difficulty}) => {
    const encodeWorkOutName = encodeURIComponent(name);

  return (
    <Link to={`/view-workout/${id}/${encodeWorkOutName}`}  className='catalog-card-component__link'>
        <div className='catalog-card-component__card'>
            <div className='catalog-card-component__card-header'>
                <img src={img} loading='lazy' className='catalog-card-component__card-img'/>
            </div>
            <div className='catalog-card-component__card-body'>
                <div>
                    <h3 className='catalog-card-component__card-title'>{name}</h3>
                    <p className='catalog-card-component__card-description'>{description}</p>
                </div>   
                <p className='catalog-card-component__card-difficulty'>Difficulty: {difficulty}</p>
            </div>
        </div>
    </Link>
  )
}

export default CatalogCardComponent

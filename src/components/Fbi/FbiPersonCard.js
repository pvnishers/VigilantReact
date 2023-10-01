import React, { useState } from 'react';
import FbiPersonDetailsModal from './FbiPersonDetailModal';
import fallbackImage from '../../images/fallback-image.jpg'

const FbiPersonCard = ({ person }) => {
  
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage; 
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="card align-items-center person-card mx-auto d-block">
      <img 
        src={person.images} 
        onError={handleImageError}
        className="card-img-top custom-image-size mt-2 mx-auto d-block" 
        alt={person.title} 
      />
      <div className="card-body">
        <h5 className="card-title">{truncateText(person.title, 30)}</h5>
        <p className="card-text">Subject: {truncateText(person.subjects || 'N/A', 60)}</p>
        <p className="card-text">Nationality: {person.nationality || 'N/A'}</p>
        <div className='spacer'></div>
        <button className="btn btn-primary mt-auto" onClick={() => setModalShow(true)}>
          See details
        </button>
        <FbiPersonDetailsModal
          person={person}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default FbiPersonCard;

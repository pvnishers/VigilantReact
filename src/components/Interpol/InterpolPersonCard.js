import React, { useState } from 'react';
import fallbackImage from '../../images/fallback-image.jpg';
import InterpolPersonDetailsModal from './InterpolPersonDetailModal';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const InterpolPersonCard = ({ person }) => {

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  };
  
  const truncatedCharge = person.arrestWarrants.length
    ? truncateText(capitalizeFirstLetter(person.arrestWarrants[0].charge), 30)
    : 'N/A';
  
    let nationalityNames;
    if (person && person.nationalities) {
      nationalityNames = person.nationalities.split(',').map(code => countries.getName(code, "en") || code).join(', ');
    } else {
      nationalityNames = "N/A"; // Ou qualquer valor padrão que você deseje
    }
    
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="card align-items-center person-card mx-auto d-block">
      <img 
        src={person.thumbnailUrl} 
        onError={handleImageError}
        className="card-img-top custom-image-size mt-2 mx-auto d-block" 
        alt={person.name} 
      />
      <div className="card-body">
        <h5 className="card-title">{person.name} {person.forename}</h5>
        <p className="card-text">Charge: {truncatedCharge}</p>
        <p className="card-text">Nationalities: {nationalityNames || 'N/A'}</p>
        <button className="btn btn-primary mt-auto" onClick={() => setModalShow(true)}>
          See details
        </button>
        <InterpolPersonDetailsModal
          person={person}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default InterpolPersonCard;

import React from 'react';
import fallbackImage from '../../images/fallback-image.jpg';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const InterpolPersonDetailsModal = ({ person, show, onHide }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  
  const fullName = `${person.forename} ${person.name}`;
  
  const gender = person.sex === 'M' ? 'Male' : person.sex === 'F' ? 'Female' : 'N/A';

  const chargesElements = person.arrestWarrants.map((warrant, index) => (
    <div key={index}>
      {`${capitalizeFirstLetter(warrant.charge)} - ${countries.getName(warrant.issuingCountryId, "en") || warrant.issuingCountryId}`}
    </div>
  ));

  let nationalityNames;
    if (person && person.nationalities) {
      nationalityNames = person.nationalities.split(',').map(code => countries.getName(code, "en") || code).join(', ');
    } else {
      nationalityNames = "N/A"; // Ou qualquer valor padrão que você deseje
    }
    
  let formattedDateOfBirth = 'N/A';
  if (person.dateOfBirth) {
    const date = new Date(person.dateOfBirth);
    formattedDateOfBirth = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{fullName}</h5>
          </div>
          <div className="modal-body d-flex flex-column flex-lg-row align-items-center">
            <img
              src={person.thumbnailUrl}
              onError={handleImageError}
              className="img-fluid rounded modal-img mx-md-4"
              alt={fullName}
            />
            <div>
              <p><strong>Date of Birth:</strong> {formattedDateOfBirth}</p>
              <p><strong>Nationality:</strong> {nationalityNames || 'N/A'}</p>
              <p><strong>Sex:</strong> {gender}</p>
              <p><strong>Charges:</strong> {chargesElements.length ? chargesElements : 'N/A'}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            <a href={`https://www.interpol.int/How-we-work/Notices/Red-Notices/View-Red-Notices#${person.entityId.replace(/\//g, '-')}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">See More</a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpolPersonDetailsModal;

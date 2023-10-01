import React from 'react';
import fallbackImage from '../../images/fallback-image.jpg';

const FbiPersonDetailsModal = ({ person, show, onHide }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{person.title}</h5>
          </div>
          <div className="modal-body d-flex flex-column flex-lg-row align-items-center">
            <img
              src={person.images}
              onError={handleImageError}
              className="img-fluid rounded modal-img mx-md-4"
              alt={person.title}
            />
            <div>
              <p><strong>Subject:</strong> {person.subjects || 'N/A'}</p>
              <p><strong>Nationality:</strong> {person.nationality || 'N/A'}</p>
              <p><strong>Sex:</strong> {person.sex || 'N/A'}</p>
              <p><strong>Age (Min-Max):</strong> {person.age_Min || '?'} - {person.age_Max || '?'}</p>
              <p><strong>Locations:</strong> {person.locations || 'N/A'}</p>
              <p><strong>Race:</strong> {person.race || 'N/A'}</p>
              <p><strong>Place of Birth:</strong> {person.place_Of_Birth || 'N/A'}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            <a href={person.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">See More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FbiPersonDetailsModal;

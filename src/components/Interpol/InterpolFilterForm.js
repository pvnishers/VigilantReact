import React, { useState, useEffect } from 'react';

const InterpolFilterForm = ({ filters, setFilters, applyFilters }) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const initialFilters = {
    nameForename: '',
    nationalities: '',
    sex: '',
    charge: '',
    issuingCountryId: '',
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (filtersChanged) {
        applyFilters(debouncedFilters);
      }
    }, 1500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [debouncedFilters, applyFilters, filtersChanged]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setDebouncedFilters((prevDebouncedFilters) => ({ ...prevDebouncedFilters, [name]: value }));
    setFiltersChanged(true);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setDebouncedFilters(initialFilters);
    setFiltersChanged(true);
  };

  return (
    <form className="mb-3 filters">
      <div>
        <label htmlFor="name-filter" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name-filter"
          name="nameForename"
          value={filters.nameForename}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nationality-filter" className="form-label">Nationality</label>
        <input
          type="text"
          className="form-control"
          id="nationality-filter"
          name="nationalities"
          value={filters.nationalities}
          onChange={handleInputChange}
        />
      </div>
      <div className="col mb-3">
          <label className="form-label">
            Sex
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="male-filter"
              name="sex"
              value="M"
              checked={filters.sex === 'M'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" for="male-filter">Male</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="female-filter"
              name="sex"
              value="F"
              checked={filters.sex === 'F'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" for="female-filter">Female</label>
          </div>
        </div>
      <div className="mb-3">
        <label htmlFor="charge-filter" className="form-label">Charge</label>
        <input
          type="text"
          className="form-control"
          id="charge-filter"
          name="charge"
          value={filters.charge}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="charge-country-filter" className="form-label">Charge Country</label>
        <input
          type="text"
          className="form-control"
          id="charge-country-filter"
          name="issuingCountryId"
          value={filters.issuingCountryId}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </form>
  );
};

export default InterpolFilterForm;

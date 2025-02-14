import React from "react";
import { Modal, Button } from "react-bootstrap";
import FilterForm from "./VehicleFilterForm"; // Import the new component

const FilterModal = ({ show, onClose, filters, setFilters, applyFilters }) => {
  const handleApply = () => {
    applyFilters(filters);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Vehicles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilterForm filters={filters} setFilters={setFilters} /> {/* Use FilterForm */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleApply}>Apply Filters</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;

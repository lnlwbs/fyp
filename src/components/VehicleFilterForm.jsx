import React from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const API_PROXY = "https://api.allorigins.win/raw?url=";
const API_BASE_URL = `${API_PROXY}http://ia.tnx1.xyz/api/v1/ia/vehicle/`;

const VehicleFilterForm = ({ filters, setFilters, setFilterModal, setVehicles }) => {
  const fetchFilteredVehicles = async (filterParams = {}) => {
    console.log("Fetching vehicles with filters:", filterParams);

    try {
      const response = await axios.post(`${API_BASE_URL}get_all_vehicles`, filterParams);

      if (response.data.data && response.data.data.result) {
        let filteredVehicles = response.data.data.result;

        // Apply filtering based on ALL fields (AND relationship)
        filteredVehicles = filteredVehicles.filter((vehicle) => {
          // Filter by approval_status
          if (
            filterParams.approval_status &&
            vehicle.approval_status !== filterParams.approval_status
          ) {
            return false;
          }

          // Filter by vehicle_status
          if (
            filterParams.vehicle_status &&
            vehicle.vehicle_status !== filterParams.vehicle_status
          ) {
            return false;
          }

          // Filter by vehicle_type
          if (
            filterParams.vehicle_type &&
            vehicle.vehicle_type !== filterParams.vehicle_type
          ) {
            return false;
          }

          // Filter by passenger_capacity (min and max)
          if (
            (filterParams.min_capacity && vehicle.passenger_capacity < filterParams.min_capacity) ||
            (filterParams.max_capacity && vehicle.passenger_capacity > filterParams.max_capacity)
          ) {
            return false;
          }

          // Filter by search_query (license plate)
          if (
            filterParams.search_query &&
            !vehicle.license_plate
              .toLowerCase()
              .includes(filterParams.search_query.toLowerCase())
          ) {
            return false;
          }

          // Filter by date range (start_date and end_date)
          if (filterParams.start_date || filterParams.end_date) {
            const vehicleDate = new Date(vehicle.mtime * 1000); // Convert timestamp to Date object
            if (
              (filterParams.start_date && vehicleDate < filterParams.start_date) ||
              (filterParams.end_date && vehicleDate > filterParams.end_date)
            ) {
              return false;
            }
          }

          // If all conditions are met, include the vehicle
          return true;
        });

        setVehicles(filteredVehicles);
      } else {
        setVehicles([]); // Clear vehicles state if no data is returned
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredVehicles(filters);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Row className="g-3">
        {/* Search by License Plate */}
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by License Plate"
              value={filters.search_query}
              onChange={(e) => setFilters({ ...filters, search_query: e.target.value })}
            />
          </InputGroup>
        </Col>

        {/* Date Range */}
        <Col md={4}>
          <div className="d-flex gap-2">
            <DatePicker
              selected={filters.start_date}
              onChange={(date) => setFilters({ ...filters, start_date: date })}
              selectsStart
              showYearDropdown
              showMonthDropdown
              dateFormat="dd/MM/yyyy"
              placeholderText="Start Date"
              className="form-control"
            />
            <DatePicker
              selected={filters.end_date}
              onChange={(date) => setFilters({ ...filters, end_date: date })}
              selectsEnd
              showYearDropdown
              showMonthDropdown
              dateFormat="dd/MM/yyyy"
              placeholderText="End Date"
              className="form-control"
            />
          </div>
        </Col>

        {/* Vehicle Type Dropdown */}
        <Col md={4}>
          <Form.Select
            value={filters.vehicle_type}
            onChange={(e) => setFilters({ ...filters, vehicle_type: e.target.value })}
          >
            <option value="">Vehicle Type</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
            <option value="Taxi">Taxi</option>
          </Form.Select>
        </Col>

        {/* Approval Status Dropdown */}
        <Col md={4}>
          <Form.Select
            value={filters.approval_status}
            onChange={(e) => setFilters({ ...filters, approval_status: e.target.value })}
          >
            <option value="">Approval Status</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </Col>

        {/* Vehicle Status Dropdown */}
        <Col md={4}>
          <Form.Select
            value={filters.vehicle_status}
            onChange={(e) => setFilters({ ...filters, vehicle_status: e.target.value })}
          >
            <option value="">Vehicle Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Decommissioned">Decommissioned</option>
          </Form.Select>
        </Col>

        {/* Passenger Capacity Range */}
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Min Capacity"
              value={filters.min_capacity}
              onChange={(e) => setFilters({ ...filters, min_capacity: e.target.value })}
            />
            <Form.Control
              type="number"
              placeholder="Max Capacity"
              value={filters.max_capacity}
              onChange={(e) => setFilters({ ...filters, max_capacity: e.target.value })}
            />
          </InputGroup>
        </Col>

        {/* Filter and Submit Buttons */}
        <Col md={4} className="text-md-end">
          <Button variant="primary" type="submit" className="ms-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default VehicleFilterForm;
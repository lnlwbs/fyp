import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Table, Form, InputGroup, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DashBoard = () => {
  // State variables
  const [highlights, setHighlights] = useState({ total_draft: 0, total_pending: 0, total_rejected: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    vehicle_type: "",
    approval_status: "",
    vehicle_status: "",
    min_capacity: "",
    max_capacity: "",
    search_query: "",
    start_date: null,
    end_date: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("last_updated");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  useEffect(() => {
    fetchHighlights();
    fetchVehicles();
  }, [filters, currentPage, sortField, sortOrder]);

  // Fetch Highlights
  const fetchHighlights = async () => {
    try {
      const response = await axios.post("http://ia.tnx1.xyz/api/v1/ia/vehicle/get_highlights");
      setHighlights(response.data.data || {}); // Extract `data`
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  // Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      const response = await axios.post("http://ia.tnx1.xyz/api/v1/ia/vehicle/get_all_vehicles", {
        ...filters,
        page_number: currentPage,
        sort_by: sortField,
        sort_order: sortOrder,
      });
      setVehicles(response.data.data.vehicles || []);
      setTotalPages(response.data.data.pagination?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // Handle Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h1 className="display-4 fw-bold">Vehicle</h1>
            {/* Cards Section */}
            <div className="row mt-3">
        {[
          { count: highlights.total_draft || 0, label: "Draft", filter: { approval_status: "Draft" } },
          { count: highlights.total_pending || 0, label: "Pending Information", filter: { approval_status: "Pending", vehicle_status: "Active" } },
          { count: highlights.total_rejected || 0, label: "Rejected", filter: { approval_status: "Rejected", vehicle_status: "Active" } },
        ].map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h2 className="fw-bold">{item.count}</h2>
                <p>{item.label}</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setFilters({ ...filters, ...item.filter });
                    fetchVehicles();
                  }}
                >
                  View →
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Search by License Plate" 
              value={filters.search_query}
              onChange={(e) => setFilters({ ...filters, search_query: e.target.value })}
            />
          </InputGroup>
        </div>

        <div className="col-12 col-md-4">
          <InputGroup>
            <DatePicker
              selected={filters.start_date}
              onChange={(date) => setFilters({ ...filters, start_date: date })}
              selectsStart
              startDate={filters.start_date}
              endDate={filters.end_date}
              placeholderText="Start Date"
              className="form-control"
            />
            <DatePicker
              selected={filters.end_date}
              onChange={(date) => setFilters({ ...filters, end_date: date })}
              selectsEnd
              startDate={filters.start_date}
              endDate={filters.end_date}
              placeholderText="End Date"
              className="form-control"
            />
          </InputGroup>
        </div>

        <div className="col-12 col-md-4 text-md-end mt-2 mt-md-0">
          <Button variant="outline-secondary" onClick={() => setFilterModal(true)}>⚙️ Filters</Button>
        </div>
      </div>

      {/* Table with Sorting */}
      <div className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort("license_plate")}>License Plate ⬆⬇</th>
              <th onClick={() => handleSort("owner")}>Owner ⬆⬇</th>
              <th onClick={() => handleSort("vehicle_type")}>Vehicle Type ⬆⬇</th>
              <th onClick={() => handleSort("vehicle_status")}>Status ⬆⬇</th>
              <th onClick={() => handleSort("approval_status")}>Approval Status ⬆⬇</th>
              <th>Driver</th>
              <th>Trips</th>
              <th>Contact</th>
              <th onClick={() => handleSort("passenger_capacity")}>Capacity ⬆⬇</th>
              <th onClick={() => handleSort("last_updated")}>Last Updated ⬆⬇</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.license_plate}</td>
                <td>{vehicle.owner}</td>
                <td>{vehicle.vehicle_type}</td>
                <td>{vehicle.vehicle_status}</td>
                <td>{vehicle.approval_status}</td>
                <td>{vehicle.driver}</td>
                <td>{vehicle.trips}</td>
                <td>{vehicle.contact_number}</td>
                <td>{vehicle.passenger_capacity}</td>
                <td>{vehicle.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Button variant="outline-primary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>←</Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button variant="outline-primary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>→</Button>
      </div>
    </div>
  );
};

export default DashBoard;

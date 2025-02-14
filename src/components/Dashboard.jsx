import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Table, InputGroup, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterModal from "./FilterModal";
import VehicleFilterForm from "./VehicleFilterForm";

const API_PROXY = "https://api.allorigins.win/raw?url=";
const API_BASE_URL = `${API_PROXY}http://ia.tnx1.xyz/api/v1/ia/vehicle/`;



const DashBoard = () => {
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

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}get_highlights`);
      setHighlights(response.data.data || {});
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  const fetchFilteredVehicles = async (filterParams = {}) => {
    console.log("Fetching vehicles with filters:", filterParams);

    try {
      const response = await axios.post(`${API_BASE_URL}get_all_vehicles`, filterParams);

      if (response.data.data && response.data.data.result) {
        let filteredVehicles = response.data.data.result;

        // Apply additional filtering based on approval_status and vehicle_status
        if (filterParams.approval_status === "Pending") {
          filteredVehicles = filteredVehicles.filter(
            (vehicle) =>
              vehicle.approval_status === "Pending" && vehicle.vehicle_status === "Active"
          );
        } else if (filterParams.approval_status === "Rejected") {
          filteredVehicles = filteredVehicles.filter(
            (vehicle) =>
              vehicle.approval_status === "Rejected" && vehicle.vehicle_status === "Active"
          );
        } else if (filterParams.approval_status === "Draft") {
          filteredVehicles = filteredVehicles.filter(
            (vehicle) =>
              vehicle.approval_status === "Draft" &&
              (vehicle.vehicle_status === "Active" || vehicle.vehicle_status === "Inactive")
          );
        }

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
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h1 className="display-4 fw-bold">Vehicle</h1>
      <div className="row mt-3">
        {[
          {
            count: highlights.total_draft || 0,
            label: "Draft",
            filter: { approval_status: "Draft" }, // No vehicle_status restriction for Draft
          },
          {
            count: highlights.total_pending || 0,
            label: "Pending Information",
            filter: { approval_status: "Pending", vehicle_status: "Active" }, // Active AND Pending
          },
          {
            count: highlights.total_rejected || 0,
            label: "Rejected",
            filter: { approval_status: "Rejected", vehicle_status: "Active" }, // Active AND Rejected
          },
        ].map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <h2 className="fw-bold">{item.count}</h2>
                <p>{item.label}</p>
                <Button variant="link" onClick={() => fetchFilteredVehicles(item.filter)}>
                  View →
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
 <VehicleFilterForm 
  filters={filters} 
  setFilters={setFilters} 
  setFilterModal={setFilterModal} 
  setVehicles={setVehicles} 
/>
      </div>

<FilterModal
  show={filterModal}
  onClose={() => setFilterModal(false)}
  filters={filters}
  setFilters={setFilters} // Only updates state
  applyFilters={(updatedFilters) => setFilters(updatedFilters)} // Save filters only
/>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Owner</th>
            <th>Vehicle Type</th>
            <th>Status</th>
            <th>Approval Status</th>
            <th>Driver</th>
            <th>Trips</th>
            <th>Contact</th>
            <th>Capacity</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.license_plate}</td>
              <td>{vehicle.vehicle_owner}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.vehicle_status}</td>
              <td>{vehicle.approval_status}</td>
              <td>{vehicle.driver}</td>
              <td>{vehicle.trips.length}</td>
              <td>{vehicle.country_code + vehicle.contact_number}</td>
              <td>{vehicle.passenger_capacity}</td>
              <td>{new Date(vehicle.mtime * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashBoard;
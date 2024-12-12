import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle"><img src ={props.record.ProductImage}/></td>
    <td className="p-4 align-middle">{props.record.ProductName}</td>
    <td className="p-4 align-middle">{props.record.ProductPrice}</td>
    <td className="p-4 align-middle">{props.record.ProductDescription}</td>
    <td className="p-4 align-middle">{props.record.ProductQuantity}</td>
    <td className="p-4 align-middle">
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 rounded-md px-3 ${
          props.record.ProductPublish === "yes"
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
        type="button"
        onClick={() => {
          props.togglePublishStatus(props.record._id);
        }}
      >
        {props.record.ProductPublish === "yes" ? "Live" : "Offline"}
      </button>
    </td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // Function to fetch records and initialize their status
  async function initializeRecords() {
    try {
      const response = await fetch(`http://localhost:5050/api/products/`);
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      const data = await response.json();

      // Ensure the button state reflects `ProductPublish`
      setRecords(data.map(record => ({
        ...record,
        ProductPublish: record.ProductPublish || "no", // Default to "no" if undefined
      })));
    } catch (error) {
      console.error("Error initializing records:", error);
    }
  }

  // Runs when the component mounts or page is revisited
  useEffect(() => {
    initializeRecords();
  }, []);

  // Function to toggle publish status
  async function togglePublishStatus(id) {
    try {
      // Fetch the complete record by ID
      const response = await fetch(`http://localhost:5050/api/products//${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching record: ${response.statusText}`);
      }
      const product = await response.json();
  
      // Assign all fields to variables
      const { ProductImage, ProductName, ProductPrice, ProductDescription, ProductQuantity, ProductPublish } = product;
  
      // Toggle the status
      const newStatus = ProductPublish === "yes" ? "no" : "yes";
  
      // Prepare the updated record
      const updatedRecord = {
        ProductImage,
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductQuantity,
        ProductPublish: newStatus,
      };
  
      // Send updated record back to backend
      const updateResponse = await fetch(`http://localhost:5050/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord),
      });
  
      if (!updateResponse.ok) {
        throw new Error(`Error updating record: ${updateResponse.statusText}`);
      }
  
      // Update the local state with the new status
      setRecords((prevRecords) =>
        prevRecords.map((rec) => (rec._id === id ? { ...rec, ProductPublish: newStatus } : rec))
      );
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  }
  

  // Delete a record
  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5050/api/products/${id}`, { method: "DELETE" });
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }

  // Map out the records into table rows
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        togglePublishStatus={() => togglePublishStatus(record._id)}
        key={record._id}
      />
    ));
  }

  // Render the table
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Product List</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Product Image
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Product Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Price
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

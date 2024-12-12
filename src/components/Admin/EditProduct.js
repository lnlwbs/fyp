import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditProduct({ id, name: initialName, type: initialType, updateProduct }) {
  const [name, setName] = useState(initialName);
  const [type, setType] = useState(initialType);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, name, type);
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Edit
      </button>


      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-6">
              <label className="block text-gray-500 font-bold mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font-bold mb-1">Product Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>
            Close
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default EditProduct;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    ProductImage: "",
    ProductName: "",
    ProductPrice: "",
    ProductDescription: "",
    ProductQuantity: "",
    ProductPublish: "No", // default to 'No'
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:5050/api/products${id}`);
      if (!response.ok) {
        console.error(`Error fetching record: ${response.statusText}`);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const endpoint = isNew
      ? "http://localhost:5050/api/products"
      : `http://localhost:5050/api/products/${params.id}`;
    const method = isNew ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setForm({
        ProductImage:"",
        ProductName: "",
        ProductPrice: "",
        ProductDescription: "",
        ProductQuantity: "",
        ProductPublish: "No",
      });
      navigate("/Inventory");
    } catch (error) {
      console.error("Error adding/updating record:", error);
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Product</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Product Details
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            {/* Product Name */}
            <div>
              <label htmlFor="ProductName" className="block text-sm font-medium text-slate-900">
                Product Name
              </label>
              <input
                type="text"
                id="ProductName"
                value={form.ProductName}
                onChange={(e) => updateForm({ ProductName: e.target.value })}
                placeholder="Enter product name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Product Price */}
            <div>
              <label htmlFor="ProductPrice" className="block text-sm font-medium text-slate-900">
                Product Price
              </label>
              <input
                type="number"
                id="ProductPrice"
                value={form.ProductPrice}
                onChange={(e) => updateForm({ ProductPrice: e.target.value })}
                placeholder="Enter product price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="ProductDescription" className="block text-sm font-medium text-slate-900">
                Product Description
              </label>
              <textarea
                id="ProductDescription"
                value={form.ProductDescription}
                onChange={(e) => updateForm({ ProductDescription: e.target.value })}
                placeholder="Enter product description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Product Quantity */}
            <div>
              <label htmlFor="ProductQuantity" className="block text-sm font-medium text-slate-900">
                Product Quantity
              </label>
              <input
                type="number"
                id="ProductQuantity"
                value={form.ProductQuantity}
                onChange={(e) => updateForm({ ProductQuantity: e.target.value })}
                placeholder="Enter product quantity"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="ProductImage" className="block text-sm font-medium text-slate-900">
                Product Image
              </label>
              <input
                type="string"
                id="ProductImage"
                value={form.ProductImage}
                onChange={(e) => updateForm({ ProductImage: e.target.value })}
                placeholder="Enter Image URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Publish */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Publish When Upload?
              </label>
              <div className="mt-2 flex items-center">
                <input
                  type="radio"
                  id="PublishYes"
                  name="ProductPublish"
                  value="Yes"
                  checked={form.ProductPublish === "Yes"}
                  onChange={() => updateForm({ ProductPublish: "Yes" })}
                />
                <label htmlFor="PublishYes" className="ml-2 mr-4">
                  Yes
                </label>
                <input
                  type="radio"
                  id="PublishNo"
                  name="ProductPublish"
                  value="No"
                  checked={form.ProductPublish === "No"}
                  onChange={() => updateForm({ ProductPublish: "No" })}
                />
                <label htmlFor="PublishNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-gray-300 bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Product
        </button>
      </form>
    </>
  );
}

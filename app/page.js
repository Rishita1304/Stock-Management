"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from  'react-loader-spinner'

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      const res = await response.json();
      setProducts(res.products);
    };
    fetchProducts();
  }, []);
  console.log(products);

  const addproduct = async (e) => {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        const newProduct = await response.json();
        toast.success("Product added Successfully!");
        console.log("Product added:", newProduct);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error while adding product:", error);
    }
    const response = await fetch('/api/product')
    let rjson = await response.json()
    setProducts(rjson.products)
    e.preventDefault();
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    const value = e.target.value
    setQuery(value);
    if (value.length>3){
      setLoading(true);
      setDropdown([])
      const response = await fetch("/api/search?query=" + query);
      const res = await response.json();
      setDropdown(res.products);
      setLoading(false);
    }
    else{
      setDropdown([]);
    }
  };

  const buttonAction = async(action, slug, initialQuantity ) => {
    let index = products.findIndex((item)=>(item.slug == slug))
    let newProducts = JSON.parse(JSON.stringify(products));
    if(action=="add"){
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    }
    else{
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
      
    }
    setProducts(newProducts);
    let indexDrop = dropdown.findIndex((item)=>(item.slug == slug))
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if(action=="add"){
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) + 1;
    }
    else{
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) - 1;
      
    }
    setDropdown(newDropdown);
    setLoadingAction(true)
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, slug, initialQuantity })
    });
    let r = await response.json()
    setLoadingAction(false)
  }

  const productCategories = ["Category A", "Category B", "Category C", "Other"];

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto">
        <h1 className="font-semibold ml-2 my-4 text-2xl">Search a Product</h1>
        <div className="flex ml-2">
          <input
          // onBlur={()=>setDropdown([])}
            onChange={onDropdownEdit}
            type="text"
            id="searchInput value={productForm?} onChange={handleChange}"
            name="searchInput value={productForm?} onChange={handleChange}"
            className="w-full p-2 border rounded"
            placeholder="Enter product name or keyword"
          />
          <select
            id="categorySelect"
            name="categorySelect"
            className="ml-2 p-2 border rounded"
          >
            <option value="">All Categories</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {loading && (
          <div className="flex my-6 justify-center items-center">
            <TailSpin
              height="40"
              width="40"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <div className="dropdown ml-2 absolute w-[86vw] bg-indigo-50 mt-1 rounded-md">
        {dropdown.map((item) => {
          return (
            <div key={item.slug} className="container flex justify-between p-4 border-b-2">
              <span className="slug my-auto">{item.slug} ({item.quantity} available for ₹{item.price})</span>
              <div className="mx-5">
              <button onClick={()=>{buttonAction("minus" , item.slug, item.quantity)}} disabled={loadingAction} className="add inline-block px-3 py-1 bg-indigo-500 font-semibold text-white rounded-lg shadow-md cursor-pointer disabled:bg-indigo-100">-</button>
              <span className="quantity inline-block w-5 mx-3">{item.quantity}</span>
              <button onClick={()=>{buttonAction("add" , item.slug, item.quantity)}} disabled={loadingAction} className="substract inline-block px-3 py-1 bg-indigo-500 font-semibold text-white rounded-lg shadow-md cursor-pointer disabled:bg-indigo-100">+</button>
              </div>
            </div>
          );
        })}
        </div>

        <h1 className="font-semibold ml-2 my-4 text-2xl">Add a Product</h1>

        <form className="mb-4 ml-2">
          <label htmlFor="slug" className="block my-3">
            Product Slug:
          </label>
          <input
            value={productForm?.slug || ""}
            onChange={handleChange}
            type="text"
            id="slug"
            name="slug"
            className="w-full p-2 border rounded"
            placeholder="Enter slug"
          />
          <label htmlFor="productName" className="block my-3">
            Product Name:
          </label>
          <input
            value={productForm?.productName || ""}
            onChange={handleChange}
            type="text"
            id="productName"
            name="productName"
            className="w-full p-2 border rounded"
            placeholder="Enter product Name"
          />

          <label htmlFor="category" className="block my-3 mt-2">
            Category:
          </label>
          <input
            value={productForm?.category || ""}
            onChange={handleChange}
            type="text"
            id="category"
            name="category"
            className="w-full p-2 border rounded"
            placeholder="Enter product category"
          />

          <label htmlFor="quantity" className="block my-3 mt-2">
            Quantity:
          </label>
          <input
            value={productForm?.quantity || ""}
            onChange={handleChange}
            type="number"
            id="quantity"
            name="quantity"
            className="w-full p-2 border rounded"
            placeholder="Enter quantity"
          />

          <label htmlFor="price" className="block my-3 mt-2">
            Price:
          </label>
          <input
            value={productForm?.price || ""}
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            className="w-full p-2 border rounded"
            placeholder="Enter price"
          />

          <button
            onClick={addproduct}
            type="submit"
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
          >
            Add Product
          </button>
        </form>

        <table className="table-auto mx-auto my-auto sm:table-row-group">
          <thead>
            <tr>
              <th className="px-8 py-4">ID</th>
              <th className="px-8 py-4">Name</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Quantity</th>
              <th className="px-8 py-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td className="border px-8 py-4">{product.slug}</td>
                <td className="border px-8 py-4">{product.productName}</td>
                <td className="border px-8 py-4">{product.category}</td>
                <td className="border px-8 py-4">{product.quantity}</td>
                <td className="border px-8 py-4">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

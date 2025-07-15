import React, { useState } from "react";

const AddMeal = ({ adminName, adminEmail, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    ingredients: "",
    description: "",
    price: "",
    postTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      category: "",
      image: "",
      ingredients: "",
      description: "",
      price: "",
      postTime: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <input
        type="text"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        placeholder="Ingredients"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="border p-3 rounded-xl md:col-span-2 focus:ring-2 ring-black"
      ></textarea>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <input
        type="datetime-local"
        name="postTime"
        value={formData.postTime}
        onChange={handleChange}
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />
      <input
        type="text"
        value={adminName}
        readOnly
        className="border p-3 rounded-xl bg-gray-100 text-gray-500"
      />
      <input
        type="text"
        value={adminEmail}
        readOnly
        className="border p-3 rounded-xl bg-gray-100 text-gray-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-black text-white border-2 border-black  outline-4 outline-offset-4 rounded-xl hover:bg-gray-800 transition md:col-span-2"
      >
        Add Meal
      </button>
    </form>
  );
};

export default AddMeal;
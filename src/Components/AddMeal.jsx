import React, { useState } from "react";
import axios from "axios";

const AddMeal = ({ adminName, adminEmail, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
    distributorName: "",
    ingredients: "",
    description: "",
    price: "",
    postTime: "", // consistent
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image!");
      return;
    }

    try {
      setUploading(true);

      const imgbbAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;

      const imageData = new FormData();
      imageData.append("image", formData.image);



      // ✅ Do NOT set headers manually
      const res = await axios.post(imgbbAPI, imageData);

      if (res.data.success) {
        const imageUrl = res.data.data.url;

        // ✅ Proper final mealData
        const mealData = {
          title: formData.title,
          category: formData.category,
          image: imageUrl,
          distributorName: formData.distributorName,
          ingredients: formData.ingredients,
          description: formData.description,
          price: parseFloat(formData.price),
          postTime: formData.postTime,
          email: adminEmail,
          displayName: adminName,
          likes: 0,
          rating: 0,
          status: "upcoming",
        };



        onSubmit(mealData);

        // ✅ Reset form fully
        setFormData({
          title: "",
          category: "",
          image: null,
          distributorName: "",
          ingredients: "",
          description: "",
          price: "",
          postTime: "",
        });
      } else {
        console.error(res.data);
        alert(`Image upload failed: ${res.data.error.message}`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload error!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-3 rounded-xl focus:ring-2 ring-black"
        required
      >
        <option value="">Select category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
        className="border p-3 rounded-xl focus:ring-2 ring-black"
      />

      <input
        type="text"
        name="distributorName"
        value={formData.distributorName}
        onChange={handleChange}
        placeholder="Distributor name"
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
        disabled={uploading}
        className="px-6 py-3 bg-black text-white border-2 border-black outline-4 outline-offset-4 rounded-xl hover:bg-gray-800 transition md:col-span-2"
      >
        {uploading ? "Uploading..." : "Add Meal"}
      </button>
    </form>
  );
};

export default AddMeal;
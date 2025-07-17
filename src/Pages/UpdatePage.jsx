import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdatePage = () => {
  const { id } = useParams();
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch meal data by ID on mount
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/meals/${id}`
        );
        setMealData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal:", error);
        toast.error("Failed to load meal data.");
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageFile = form.image.files[0];

    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    try {
      // 1️⃣ Upload to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;
      console.log("Image URL:", imageUrl);

      // 2️⃣ Create updated meal object
      const updatedMeal = {
        title: form.title.value,
        category: form.category.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        distributorName: form.distributorName.value,
        ingredients: form.ingredients.value,
        date: form.date.value,
        email: mealData.email,
        displayName: mealData.displayName,
        image: imageUrl,
      };

      // 3️⃣ Send update request to backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/meals/${id}`,
        updatedMeal
      );

      if (response.data.success) {
        toast.success("Meal updated successfully!");
      } else {
        toast.error("Failed to update meal.");
      }
    } catch (error) {
      console.error("Error uploading image or updating meal:", error);
      toast.error("Failed to update meal. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading meal data...</p>;
  }

  if (!mealData) {
    return <p>No meal found.</p>;
  }

  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 my-5 md:my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Update Meal</h3>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          defaultValue={mealData.title}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        />

        <select
          name="category"
          required
          defaultValue={mealData.category}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        >
          <option value="">Select category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          name="ingredients"
          required
          defaultValue={mealData.ingredients?.join(", ")}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        />

        <input
          type="file"
          placeholder="Image"
          className="border p-3 rounded-xl focus:ring-2 ring-black"
          name="image"
          required
        />

        <textarea
          placeholder="Description"
          name="description"
          required
          defaultValue={mealData.description}
          className="border p-3 rounded-xl md:col-span-2 focus:ring-2 ring-black"
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          name="price"
          step="0.01"
          required
          defaultValue={mealData.price}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        />

        <input
          type="text"
          placeholder="Distributor name"
          name="distributorName"
          required
          defaultValue={mealData.distributorName}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        />

        <input
          type="datetime-local"
          name="date"
          required
          defaultValue={mealData.date?.slice(0, 16)}
          className="border p-3 rounded-xl focus:ring-2 ring-black"
        />

        <button className="px-6 py-3 bg-black text-white border-2 border-black outline-4 outline-offset-4 rounded-xl hover:bg-gray-800 transition md:col-span-2">
          Update Meal
        </button>
      </form>
    </section>
  );
};

export default UpdatePage;
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const AdminAddMeal = () => {
  const { userData } = useContext(AuthContext);

  const handleFromSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      toast.error("User data not loaded yet!");
      return;
    }

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const image = form.image.files[0];
    const ingredients = form.ingredients.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const distributorName = form.distributorName.value;
    const date = form.date.value;

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image to imgbb using axios
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      if (imgRes.data.success) {
        const mealData = {
          title,
          category,
          image: imgRes.data.data.url,
          ingredients,
          description,
          price,
          distributorName,
          date,
          email: userData.email,
          displayName: userData.displayName,
        };

        // Send mealData to your backend with axios
        const backendRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/meals`,
          mealData
        );
        
        if (backendRes.data.success) {
          toast.success("Meal added successfully!");
          form.reset();
        } else {
          toast.error("Failed to add meal.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };


  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 my-5 md:my-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Meal</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleFromSubmit}>
          <input type="text" placeholder="Title" className="border p-3 rounded-xl focus:ring-2 ring-black" name='title'/>
          <input type="text" placeholder="Category" className="border p-3 rounded-xl focus:ring-2 ring-black" name='category'/>
          <input type="file" placeholder="Image" className="border p-3 rounded-xl focus:ring-2 ring-black" name='image'/>
          <input type="text" placeholder="Ingredients" className="border p-3 rounded-xl focus:ring-2 ring-black" name='ingredients'/>
          <textarea placeholder="Description" className="border p-3 rounded-xl md:col-span-2 focus:ring-2 ring-black" name='description'></textarea>
          <input type="number" placeholder="Price" className="border p-3 rounded-xl focus:ring-2 ring-black" name='price'/>
          <input type="text" placeholder="Distributor name" className="border p-3 rounded-xl focus:ring-2 ring-black" name='distributorName'/>
          <input type="datetime-local" className="border p-3 rounded-xl focus:ring-2 ring-black" name='date'/>
          <input type="text" value={userData.displayName} readOnly className="border p-3 rounded-xl bg-gray-100 text-gray-500" />
          <input type="text" value={userData.email} readOnly className="border p-3 rounded-xl bg-gray-100 text-gray-500" />
          <button className="px-6 py-3 bg-black text-white border-2 border-black  outline-4 outline-offset-4 rounded-xl hover:bg-gray-800 transition md:col-span-2">
            Add Meal
          </button>
        </form>
      </section>
  )
}

export default AdminAddMeal
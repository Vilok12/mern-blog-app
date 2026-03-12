import React from "react";
import { useForm } from "react-hook-form";

function AddArticle() {

  const { register, handleSubmit,reset } = useForm();

  const onArticleSubmit = (data) => {
    console.log("Article data:", data);
    reset()
  };

  return (
    <div className="flex flex-col items-center mt-8">

      <h2 className="text-2xl font-semibold mb-6">
        AddArticle.jsx
      </h2>

      <div className="bg-gray-200 p-12 w-175 rounded">

        <form onSubmit={handleSubmit(onArticleSubmit)} className="flex flex-col gap-6">

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Category */}
          <select
            {...register("category")}
            className="bg-gray-300 p-3 rounded w-full"
          >
            <option value="">Category</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>

          {/* Content */}
          <textarea
            placeholder="Content"
            rows="6"
            {...register("content")}
            className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-sky-500 py-3 px-8 rounded w-52 self-center hover:bg-sky-600"
          >
            Publish Article
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddArticle;
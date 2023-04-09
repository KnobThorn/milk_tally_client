import React from "react";

export default function () {
  return (
    <form className="m-10 p-10" onSubmit={handleSubmit}>
      <div className="mb-8">
        <input
          type="text"
          name="login_member_name"
          value={inputs.login_member_name || ""}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-8 ">
        <input
          id="id"
          name="login_member_id"
          value={inputs.login_member_id || ""}
          onChange={handleChange}
          placeholder="user id"
          className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-8">
        <input
          id="route"
          type="text"
          name="login_member_route_no"
          value={inputs.login_member_route_number || ""}
          onChange={handleChange}
          placeholder="Route no"
          className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-8">
        <input
          id="collection id"
          type="password"
          name="login_member_collection_id"
          value={inputs.login_member_collection_id || ""}
          onChange={handleChange}
          placeholder="collection center id"
          className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-8">
        <input
          id="password"
          type="password"
          name="login_member_password"
          value={inputs.login_member_password || ""}
          onChange={handleChange}
          placeholder="password"
          className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
        Sign In
      </button>
    </form>
  );
}

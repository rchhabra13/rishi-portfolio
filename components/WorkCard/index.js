import React from "react";

const WorkCard = ({ img, name, description, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-3 first:ml-0 link hover:shadow-md transition"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-36 tablet:h-40 laptop:h-44"
      >
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        ></img>
      </div>
      <h1 className="mt-3 text-lg tablet:text-xl font-semibold">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-sm tablet:text-base opacity-60">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;

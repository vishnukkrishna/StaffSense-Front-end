import React from "react";

function test() {
  return (
    <>
      <div>
        <div className="bg-brown-900 flex flex-row lg:flex-row gap-2 p-4">
          <div className="bg-blue-gray-400 h-full w-full lg:w-1/2 m-3 lg:items-center border-black3200 border-5">
            <h1 className="m-3">Normal</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
              velit voluptas nisi ipsum voluptates ea temporibus dicta at enim,
              et minima cumque iste quam.
            </p>
          </div>
          <div className="bg-blue-500 h-full w-full lg:w-1/2 m-3 border-black3200 border-2">
            <h2>Bigger</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
              velit voluptas nisi ipsum voluptates ea temporibus dicta at enim,
              et minima cumque iste quam.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default test;

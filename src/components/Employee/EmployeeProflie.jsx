import React from "react";
import profile from "../../images/profile-pic.jpg";

function EmployeeProflie() {
  return (
    <div className="w-full mt-20 font-fontHubballi">
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-500">Completed Tasks</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-500">Leaves</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <div className="flex justify-end  h-30 w-30 cursor-pointer">
                  <img src={profile} alt="Logo" />
                </div>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-900 shadow hover:shadow-lg text-lg transition transform hover:-translate-y-0.5">
                Edit Profle
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-900 shadow hover:shadow-lg text-lg transition transform hover:-translate-y-0.5">
                Edit Password
              </button>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-semibold text-gray-700">
              Vishnu Krishnakumar
            </h1>
            <p className="font-light text-gray-600 mt-3 text-lg">Python Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProflie;

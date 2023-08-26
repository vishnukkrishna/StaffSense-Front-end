import React from "react";

function AdminDashboard() {
  return (
    <div className="max-w-7xl font-fontHubballi mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {/* Our service statistics */}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-2xl leading-5 font-bold text-gray-500 truncate">
                Total Employees
              </dt>
              <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-indigo-600">
                10
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-2xl leading-5 font-bold text-gray-500 truncate">
                Total Departments
              </dt>
              <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-indigo-600">
                10
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-2xl leading-5 font-bold text-gray-500 truncate">
                Daily Visitors
              </dt>
              <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-indigo-600">
                10
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-2xl leading-5 font-bold text-gray-500 truncate">
                Today’s Booking
              </dt>
              <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-indigo-600">
                10
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-2xl leading-5 font-bold text-gray-500 truncate">
                Today’s Absentees
              </dt>
              <dd className="mt-1 text-center text-3xl leading-9 font-semibold text-indigo-600">
                10
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

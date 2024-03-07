import React, { useEffect, useState } from "react";
import { fetchVisitors } from "../../data/VisitorApi";
import { ToastContainer } from "react-toastify";
import AddVisitors from "../Modal/EmployeeModal/AddVisitors";
import Loading from "../../components/Spinner/Spinner";

function EmployeeVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ComplaintPerPage = 3;

  // Add state variables for search
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    fetchVisitorData();
  }, [currentPage]);

  useEffect(() => {
    // Update filtered visitors whenever searchQuery changes
    filterVisitors();
  }, [searchQuery, visitors]);

  const fetchVisitorData = async () => {
    try {
      setLoading(true);
      const data = await fetchVisitors();
      setVisitors(data);
    } catch (error) {
      console.error("Error fetching visitor data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastComplaint = currentPage * ComplaintPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - ComplaintPerPage;
  const currentVisitor = filteredVisitors.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to filter visitors based on searchQuery
  const filterVisitors = () => {
    if (searchQuery.trim() === "") {
      setFilteredVisitors(visitors);
    } else {
      const filtered = visitors.filter((visitor) => {
        return (
          visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visitor.reason.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredVisitors(filtered);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        {loading && <Loading />}
        <div className="mt-10 pl-20">
          <AddVisitors Action={fetchVisitorData} />
          <form style={{ maxWidth: "600px", margin: "100px auto" }}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Visitors"
                value={searchQuery}
                onChange={handleSearchInputChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* mt-40  */}
        <div className="flex relative font-fontHubballi mt-14 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-lg">
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Visitor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Start_time
                </th>
                <th scope="col" className="px-6 py-3">
                  End_time
                </th>
              </tr>
            </thead>
            <tbody>
              {currentVisitor.map((visitor, index) => (
                <tr
                  key={visitor.id}
                  className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{visitor.name}</td>
                  <td className="px-6 py-4">{visitor.reason}</td>
                  <td className="px-6 py-4">{visitor.email}</td>
                  <td className="px-6 py-4">{visitor.date}</td>
                  <td className="px-6 py-4">{visitor.start_time}</td>
                  <td className="px-6 py-4">{visitor.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 mr-64">
        <nav aria-label="Page navigation">
          <ul className="inline-flex">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${
                  currentPage === 1 ? "cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {Array.from({
              length: Math.ceil(filteredVisitors.length / ComplaintPerPage),
            }).map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 focus:shadow-outline ${
                    currentPage === index + 1
                      ? "bg-indigo-500 text-red-800 text-2xl font-extrabold"
                      : "hover:bg-red-200 hover:text-red-500"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-indigo-500 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${
                  currentPage ===
                  Math.ceil(filteredVisitors.length / ComplaintPerPage)
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  currentPage ===
                  Math.ceil(filteredVisitors.length / ComplaintPerPage)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default EmployeeVisitors;

import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addAnnouncement, deleteAnnouncement, fetchAnnouncements } from '../../data/AnnouncementApi'
import AddAnnouncement from "../Modal/AdminModal/AddAnnouncement";
import Swal from 'sweetalert2';

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const AnnouncementPerPage = 3;

  const fetchAnnouncementData = async () => {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnnouncementData();
  }, [currentPage]);

  const handleAddAnnouncement = async (newAnnouncement) => {
    try {
      const createdAnnouncement = await addAnnouncement(newAnnouncement);
      setAnnouncements((prevAnnouncements) => [
        createdAnnouncement,
        ...prevAnnouncements,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      const result = await Swal.fire({
        title: 'Do you really want to delete this announcement?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });
      if (result.isConfirmed) {
        await deleteAnnouncement(announcementId);
        console.log("Announcement deleted successfully");
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter(
            (announcement) => announcement.id !== announcementId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const indexOfLastAnnouncement = currentPage * AnnouncementPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - AnnouncementPerPage;
  const currentAnnouncement = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="mt-10 pl-20">
        <AddAnnouncement Action={fetchAnnouncementData} />
      </div>
      <div className="mt-52 overflow-x-auto shadow-md sm:rounded-lg w-3/5 h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg text-center">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th scope="col" className="px-6 py-3">
                Notes
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAnnouncement.map((announcement, index) => (
              <tr key={announcement.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{announcement.event}</td>
                <td className="px-6 py-4">{announcement.note}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-around cursor-pointer">
                    <RiDeleteBin6Line className="text-red-500 text-2xl" onClick={() => handleDeleteAnnouncement(announcement.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4 mr-10">
          <nav aria-label="Page navigation">
            <ul className="inline-flex">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>
              {Array.from({ length: Math.ceil(announcements.length / AnnouncementPerPage) }).map(
                (item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 focus:shadow-outline ${currentPage === index + 1
                        ? "bg-indigo-500 text-red-800 text-2xl font-extrabold"
                        : "hover:bg-red-200 hover:text-red-500"
                        }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-indigo-500 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${currentPage ===
                    Math.ceil(announcements.length / AnnouncementPerPage)
                    ? "cursor-not-allowed"
                    : ""
                    }`}
                  disabled={
                    currentPage ===
                    Math.ceil(announcements.length / AnnouncementPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default AdminAnnouncements;

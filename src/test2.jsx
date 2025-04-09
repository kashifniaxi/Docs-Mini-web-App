import React, { useState } from "react";
import { mockCourses2 } from "../../../MockData/mockCourses2";

const CoursesTablePopup = ({ onClose, onSave, selectedCourses }) => {
  const [selected, setSelected] = useState(selectedCourses);

  const handleCheckboxChange = (courseId) => {
    setSelected((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Select Courses</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Select</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Credit Hours</th>
              <th className="border px-4 py-2">Delivery Format</th>
            </tr>
          </thead>
          <tbody>
            {mockCourses2.map((course) => {
              let deliveryFormat = "";
              let adjustedCreditHours = course.creditHours;

              if (!course.isTheory) {
                deliveryFormat = "Lab";
              } else if (course.isTheory && !course.isLab) {
                deliveryFormat = "Theory";
              } else if (course.isTheory && course.isLab) {
                deliveryFormat = "Theory + Lab";
                adjustedCreditHours += 1;
              }

              return (
                <tr key={course.courseId} className="text-center">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.courseId)}
                      onChange={() => handleCheckboxChange(course.courseId)}
                      className="cursor-pointer w-4 h-4"
                    />
                  </td>
                  <td className="border px-4 py-2">{course.courseCode}</td>
                  <td className="border px-4 py-2">{course.courseName}</td>
                  <td className="border px-4 py-2">{course.department}</td>
                  <td className="border px-4 py-2">{adjustedCreditHours}</td>
                  <td className="border px-4 py-2">{deliveryFormat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => onSave(selected)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCourses = ({ school, semester, prefix, onBack, onNext }) => {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Handle the save of selected courses
  const handleSaveCourses = (selectedCourseIds) => {
    const selectedCourses = mockCourses2.filter((course) =>
      selectedCourseIds.includes(course.courseId)
    );

    const updatedCourses = selectedCourses.map((course) => {
      let deliveryFormat = "";
      let adjustedCreditHours = course.creditHours;

      if (!course.isTheory) {
        deliveryFormat = "Lab";
      } else if (course.isTheory && !course.isLab) {
        deliveryFormat = "Theory";
      } else if (course.isTheory && course.isLab) {
        deliveryFormat = "Theory + Lab";
        adjustedCreditHours += 1;
      }

      return {
        ...course,
        deliveryFormat,
        creditHours: adjustedCreditHours,
        sections: 1,  // Default section count
      };
    });

    setCourses(updatedCourses);
    setShowPopup(false);
  };

  // Handle the data pass for the next step
  const handleNextStep = () => {
    // You can pass the courses state to the next step
    onNext(courses);
  };

  return (
    <div className="w-full max-w-6xl bg-white p-6 shadow-md rounded-md mb-4">
      <div className="bg-white p-4 shadow rounded-md">
        <div className="flex border-b border-gray-200">
          <div
            className="w-1/3 text-center pb-2 border-b-4 border-gray-300 text-gray-400 cursor-pointer"
            onClick={onBack}
          >
            Step 1 <br /> Select Semester
          </div>
          <div className="w-1/3 text-center pb-2 border-b-4 border-green-600 font-semibold text-gray-800">
            Step 2 <br /> Add Courses & Select No. of Sections
          </div>
          <div
            className="w-1/3 text-center pb-2 border-b-4 border-gray-300 text-gray-400 cursor-pointer"
            onClick={handleNextStep}
          >
            Step 3 <br /> Select Teachers
          </div>
        </div>

        {/* School, Semester, Prefix Fields */}
        <div className="mt-6 grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">School</label>
            <input
              type="text"
              value={school}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Semester</label>
            <input
              type="text"
              value={semester}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Prefix</label>
            <input
              type="text"
              value={prefix}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {/* Add Course Button */}
        <div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setShowPopup(true)}
          >
            Add Course
          </button>
        </div>

        {/* Selected Courses Table */}
        {courses.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Courses</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Number of Sections</th>
                  <th className="border px-4 py-2">Code</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Credit Hours</th>
                  <th className="border px-4 py-2">Delivery Format</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.courseId} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={course.sections || 1}
                        onChange={(e) => {
                          const updatedCourses = [...courses];
                          updatedCourses[index].sections = e.target.value;
                          setCourses(updatedCourses);
                        }}
                        className="border p-1 w-12 text-center"
                      />
                    </td>
                    <td className="border px-4 py-2">{course.courseCode}</td>
                    <td className="border px-4 py-2">{course.courseName}</td>
                    <td className="border px-4 py-2">{course.department}</td>
                    <td className="border px-4 py-2">{course.creditHours}</td>
                    <td className="border px-4 py-2">{course.deliveryFormat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
          <button onClick={handleNextStep} className="bg-green-600 text-white px-4 py-2 rounded">Next</button>
        </div>
      </div>

      {/* Pop-up Modal */}
      {showPopup && (
        <CoursesTablePopup
          onClose={() => setShowPopup(false)}
          onSave={handleSaveCourses}
          selectedCourses={courses.map((course) => course.courseId)}
        />
      )}
    </div>
  );
};

export default AddCourses;
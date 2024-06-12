import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../../components/Header";
import Spinner from "../../components/UI/Spinner";
import { MdDelete } from "react-icons/md";

function Admin() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken == null) {
        navigate("/admin/login");
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setTeachers(response.data.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/teachers`,
          {
            params: {
              admissionStatus: false,
            },
          }
        );
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleDeleteTeacher = async (_id, index) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const updatedTeachers = [...teachers];
      updatedTeachers.splice(index, 1);
      setTeachers(updatedTeachers);
      toast.success("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Error deleting teacher");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    subject: "",
    department: "",
    password: "",
    passwordConfirm: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const requestData = {
      email: formData.email,
      name: formData.name,
      subject: formData.subject,
      department: formData.department,
      age: formData.age,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      fetchData();
      setFormData({
        name: "",
        email: "",
        age: "",
        subject: "",
        department: "",
        password: "",
        passwordConfirm: "",
      });
      setIsModalOpen(false);
      toast.success("Teacher Added");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  }

  const handleApproveReject = (_id) => {
    const updatedStudents = students.filter((student) => student._id !== _id);
    setStudents(updatedStudents);
  };

  const approveStudent = async (_id) => {
    try {
      setSpinner(true);
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/v1/admin/approvestudent/${_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setSpinner(false);
      toast.success("Student approved successfully");
    } catch (error) {
      setSpinner(false);
      console.error("Error approving student:", error);
      toast.error("Error approving student");
    }
  };

  const deleteStudent = async (_id) => {
    try {
      setSpinner(true);
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/rejectStudent/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setSpinner(false);
      toast.info("Student rejected successfully");
    } catch (error) {
      setSpinner(false);
      console.error("Error rejecting student:", error);
      toast.error("Error rejecting student");
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <Header name="Admin Dashboard" style="bg-red-500" />
          <section className="container px-6">
            <div className="py-4">
              <div className="pagecontent">
                <h2 className="text-2xl font-semibold mb-4">Status</h2>
                <hr className="mt-0 mb-4" />
                <div className="flex justify-center text-center">
                  <div
                    className="bg-blue-500 min-w-80 text-white rounded-lg shadow-lg flex flex-col justify-between h-40 "
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="p-4 flex flex-col gap-4">
                      <p className="text-2xl font-bold">Total Teachers</p>
                      <p className="text-xl">{teachers.length}</p>
                    </div>
                    <div className="flex justify-center border-t items-center py-2 cursor-pointer hover:bg-blue-600 rounded-b-lg">
                      Add Teacher
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4 sm:mx-auto">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h1 className="text-lg font-semibold">Add Teacher</h1>
                  </div>
                  <form onSubmit={submitHandler} className="mt-4 space-y-4">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={changeHandler}
                      placeholder="Name"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={changeHandler}
                      placeholder="Department"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={changeHandler}
                      placeholder="Subject"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={changeHandler}
                      placeholder="Age"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="email"
                      value={formData.email}
                      onChange={changeHandler}
                      name="email"
                      placeholder="Email"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={changeHandler}
                      placeholder="Password"
                    />
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={changeHandler}
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 focus:outline-none"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
                      >
                        Add Teacher
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            )}

            <div className="container mx-auto py-4">
              <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
              <hr className="mt-0 mb-4" />
              <table className="table-auto w-full text-center">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Sr.No</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{teacher.name}</td>
                      <td className="border px-4 py-2">
                        {teacher.subject.join(", ")}
                      </td>
                      <td className="border px-4 py-2">{teacher.department}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 text-white rounded px-4 py-2"
                          onClick={() =>
                            handleDeleteTeacher(teacher._id, index)
                          }
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="container mx-auto py-4">
              <div className="teacher">
                <h2 className="text-2xl font-semibold mb-4">Students</h2>
                <p>List of students</p>
                <hr className="mt-0 mb-4" />
                <div className="grid xl:grid-cols-4 sm:grid-cols-2 items-center justify-center gap-4 mx-12">
                  {students.map((student) => (
                    <div className="card-body border shadow-lg rounded-lg p-4 w-72" key={student._id}>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/001/942/923/large_2x/student-boy-with-school-suitcase-back-to-school-free-vector.jpg"
                        className="card-img-top"
                        alt="..."
                        style={{ height: "256px" }}
                      />
                      <h5 className="card-title">
                        Name: {student.name}
                      </h5>
                      <p className="card-text">
                        Department: {student.department}
                      </p>
                      <p className="card-text">
                        Email: {student.email}
                      </p>
                      <div className="flex justify-around mt-4">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
                          onClick={() => {
                            handleApproveReject(student._id);
                            approveStudent(student._id);
                            toast.success("Student Approved");
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-800 text-white rounded px-4 py-2"
                          onClick={() => {
                            handleApproveReject(student._id);
                            deleteStudent(student._id);
                            toast.info("Student Rejected");
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Admin;
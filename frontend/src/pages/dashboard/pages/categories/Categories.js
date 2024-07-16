import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/product/categories"
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories", error);
      setLoading(false);
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/product/categories/new",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: response.data.message,
      }).then(() => {
        fetchCategories();
        setName("");
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        console.error("Error creating category", error);
        Swal.fire({
          text: "An error occurred while creating the category.",
          icon: "error",
        });
      }
    }
  };

  const deleteCategory = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!isConfirm.isConfirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/product/categories/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category has been deleted successfully.",
      }).then(() => {
        fetchCategories();
      });
    } catch (error) {
      console.error("Failed to delete category", error);
      Swal.fire({
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  const openEditModal = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/categories/${id}`
      );
      const category = response.data;
      setEditCategoryId(category.id);
      setEditCategoryName(category.name);
      setEditModalShow(true);
    } catch (error) {
      console.error("Error fetching category for edit", error);
      Swal.fire({
        text: "Failed to fetch category for edit",
        icon: "error",
      });
    }
  };

  const closeEditModal = () => {
    setEditModalShow(false);
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  const handleEditCategory = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/product/categories/${editCategoryId}`,
        { name: editCategoryName }
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: response.data.message,
      });
      fetchCategories();
      setEditModalShow(false);
    } catch (error) {
      console.error("Failed to update category", error);
      Swal.fire({
        text: "Failed to update category",
        icon: "error",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-5">
        <form onSubmit={submitCategory}>
          <div className="container-fluid card shadow my-2 mx-2">
            <div>
              <h3 className="text-success text-center">Create Category</h3>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Danh Mục
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Nhập tên Danh Mục"
                value={name}
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Lưu
            </button>
          </div>
        </form>
      </div>
      <div className="col-7">
        <div className="container-fluid">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">
                All Category
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {loading ? (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    cellSpacing="0"
                    style={{ width: "700px" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "20px" }}>Id</th>
                        <th style={{ width: "100px" }}>Name</th>
                        <th style={{ width: "150px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            <Button
                              variant="success me-2"
                              onClick={() => openEditModal(category.id)}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteCategory(category.id)}
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={editModalShow} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editName" className="form-label">
              Tên Danh M
            </label>
            <input
              type="text"
              className="form-control"
              id="editName"
              name="editName"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;

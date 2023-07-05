import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);  //it will display the product according to the page number defined in useState which is 2
  const [pageSize, setPageSize] = useState(2); // Number of items per page as per the value given in the useState
  const [search, setSearch] = useState("");
  // const [sort,setSort]=useState("asc");
  const [column, setColumn] = useState("Name");

  const [sortOrder, setSortOrder] = useState("asc");


  const fetchInfo = () => {

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNjM0YTYwZWMtOTZiYy00ZjM3LTkzN2YtMjdiYTUyZjU4ZDQxIiwiZW1haWwiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJqdGkiOiJkZDE1MzE5My0xN2FhLTQ1YzYtYjQxYi05NWYwZmRkYWY5YjEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2ODg1MzMyNzksImV4cCI6MTY4OTEzODA3OSwiaWF0IjoxNjg4NTMzMjc5fQ.HISth3Twxt6VJp9Zj8rbGJpZm27sQKDV0j8jXAozZlk";
    axios
      .get(
        `https://localhost:7257/api/Admin/getproduct?page=${currentPage}&pageSize=${pageSize}&search=${search}&sort=${sortOrder}&column=${column}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.productPerPage);

        setCount(res.data.totalCount);
        setTotalPage(res.data.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  useEffect(() => {
    fetchInfo();
  }, [currentPage, pageSize, search,column,sortOrder]);      // Fetch data whenever currentPage or pageSize changes, column is also there i have changed this

  

  const handlePageChange = (selectedPage) => {
    const pageNumber = selectedPage.selected + 1;
    setCurrentPage(pageNumber);
  };
  const handleColumn = (e) => {
    const selectedColumn = e.target.value;
    if (column === selectedColumn) {
      
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setColumn(selectedColumn);
      setSortOrder("asc");
    }
    // fetchInfo();
  };



  return (

    <div className="container my-4">
      <div className="container">
        <input value={search} onChange={e => setSearch(e.target.value.trim())} />
        <select className="form px-2 " aria-label="Default select example" onChange={(e) => setPageSize(e.target.value)}>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <table className="table table-success table-striped container my-4">
        <thead className="table-dark">
          <tr>
            <th><button onClick={handleColumn} value={"Name"} className="btn btn-dark">Name&nbsp;{column === "Name" && (sortOrder === "desc")}</button></th>
            <th><button onClick={handleColumn} value={"Description"} className="btn btn-dark">Description&nbsp;{column === "Description" && (sortOrder === "desc")}</button></th>
            <th><button onClick={handleColumn} value={"Category"} className="btn btn-dark">Category&nbsp;{column === "Category" && (sortOrder === "desc")}</button></th>
            <th><button onClick={handleColumn} value={"Price"} className="btn btn-dark">Price&nbsp;{column === "Price" && (sortOrder === "desc")}</button></th>
            <th><button onClick={handleColumn} value={"Rating"} className="btn btn-dark">Rating&nbsp;{column === "Rating" && (sortOrder === "desc")}</button></th>
            <th><button onClick={handleColumn} value={"Quantity"} className="btn btn-dark">Quantity&nbsp;{column === "Quantity" && (sortOrder === "desc")}</button></th>
            <th ><button className="btn btn-dark">Operations</button></th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataObj) => {
            return (
              <tr key={dataObj.id}>
                <td>{dataObj.name}</td>
                <td>{dataObj.description}</td>
                <td>{dataObj.category}</td>
                <td>{dataObj.price}</td>
                <td>{dataObj.rating}</td>
                <td>{dataObj.quantity}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(dataObj.id)}
                  >
                    Edit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => handleDelete(dataObj.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;

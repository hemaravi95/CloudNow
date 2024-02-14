import DataTable from "react-data-table-component";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Modal, Spinner } from "react-bootstrap";

interface DataRow {
  sno: any;
  name: any;
  username: any;
  email: any;
}

function App() {
  const [records, setRecords] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    userList();
  }, []);

  //datatable(column)
  const columns = [
    {
      name: "Sno",
      selector: (column_type: { sno: any }) => column_type.sno,
      width: "80px",
    },
    {
      name: "Name",
      selector: (column_type: { name: any }) => column_type.name,
    },
    {
      name: "User Name",
      selector: (column_type: { username: any }) => column_type.username,
    },
    {
      name: "Email",
      selector: (column_type: { email: any }) => column_type.email,
    },
  ];

  //user list api call - datatable(data)
  async function userList() {
    setLoading(true);
    const api_call = await axios("https://jsonplaceholder.typicode.com/users");
    const updatedData = api_call.data.map((item: any, index: any) => ({
      ...item,
      sno: index + 1,
    }));
    setRecords(updatedData);
    setLoading(false);
  }

  //input field validation
  function validation() {
    if (!name) {
      alert("Enter Name");
    }
    if (!username) {
      alert("Enter User Name");
    }
    if (!email) {
      alert("Enter Email");
    }
  }

  //submit onclick
  const submitValue = () => {
    validation();
    emailValidation();
    const newUser = {
      name: name !== "",
      username: username !== "",
      email: email !== "",
      sno: records.length + 1,
    };
    setRecords([...records, newUser]);
    setShow(false);
    alert("User added successfully");
  };

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      alert("Valid Email");
    } else if (!regEx.test(email) && email !== "") {
      alert("Invalid email");
    } else {
      alert("");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      {loading ? (
        <>
          <Spinner animation="border" variant="success" />
          <p>Loading</p>
        </>
      ) : (
        <>
          <Button className="add_button mb-2" onClick={handleShow}>
            Add New User
          </Button>
          <DataTable
            columns={columns}
            data={records}
            pagination
            highlightOnHover
            fixedHeader
          />
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-control mb-3"
                type="text"
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="add_button"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="add_button"
                onClick={submitValue}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default App;

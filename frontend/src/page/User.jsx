import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import instance from "../services/instance";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function User() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState("name");
  const [addUser, setAddUser] = React.useState({
    username: "",
    email: "",
    isAdmin: "",
    password: "",
  });

  const handlePage = (event, value) => {
    setPage(value);
  };
  function getAllUsersData() {
    setIsLoading(true);
    instance
      .get(`/users/allUsers`)
      .then((res) => {
        setUserData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }
  React.useEffect(() => {
    getAllUsersData();
  }, []);

  const handleChange = (e) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addUser);

    setIsLoading(true);
    try {
      const res = await instance.post("/users/create", addUser);
      console.log(addUser);
      console.log(res);
      handleClose();
      getAllUsersData();
      setIsLoading(false);
      enqueueSnackbar({
        message: "User Created Sussessfully",
        variant: "success",
      });
      setAddUser({
        username: "",
        email: "",
        isAdmin: "",
        password: "",
      });
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar({
        message: error.message,
        variant: "error",
      });
    }
  };

  //--------------
  const deleteUser = async (id) => {
    setIsLoading(true);
    await instance.delete(`/users/delete/${id}`);
    setIsLoading(false);
    enqueueSnackbar({
      message: "Successfully User Deleted",
      variant: "success",
    });
    getAllUsersData();
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550, my: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Button>ID</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => setSorting("name")}>Name</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => setSorting("email")}>Login ID</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => setSorting("role")}>User Role</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => setSorting("date")}>Created Date</Button>
              </TableCell>
              <TableCell align="center">
                <Button>Action</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.slice(5 * page - 5, 5 * page).map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.isAdmin === true ? "Admin" : "User"}
                </TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => deleteUser(row._id)}
                    size="small"
                    variant="contained"
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
        <Pagination
          count={
            userData.length % 5 === 0
              ? userData.length / 5
              : parseInt(userData.length / 5 + 1)
          }
          page={page}
          onChange={handlePage}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
        <Button onClick={handleOpen} variant="contained">
          create user
        </Button>
      </Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="h1" variant="h5">
              Create User
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="username"
                value={addUser.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                type="email"
                required
                fullWidth
                id="email"
                label="Login ID"
                name="email"
                value={addUser.email}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  name="isAdmin"
                  value={addUser.isAdmin}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Admin</MenuItem>
                  <MenuItem value={false}>User</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={addUser.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add user
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            bgcolor: "lightblue",
          }}
        >
          <CircularProgress color="success" />
          Loading....
        </Box>
      )}
    </Box>
  );
}

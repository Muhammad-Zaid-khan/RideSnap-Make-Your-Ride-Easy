import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "./SignUpSchema";
import { TextField, Button, Typography, Container, Box, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import axios from "axios";


interface formValues {
  name: String,
  email: String,
  password: String,
  confirm_password: String,
  role: String,
}

const initialValues: formValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role: "",
}



const Register = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
        values
      );
      action.resetForm();

      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ errors",
        errors
       
      );
      alert("Email already Registered");
  
      const baseUrl = 'http://localhost:8080'
      
      axios.post(`${baseUrl}/users/register`, values)
      .then(response => {
        console.log(response.data);
        alert("Registered Sucessfully");
        navigate('/ride');
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    }
  });

  return (

    <Container maxWidth="sm">
      <Box my={4} p={3} borderRadius={2} boxShadow={3}>
        <Typography variant="h4" gutterBottom >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name}
                onBlur={handleBlur}
              />
              <p className="text-red-400" >{errors.name}</p>
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                onBlur={handleBlur}
              />
              <p className="text-red-400 ml-0.5 px-1"> {errors.email}</p>

            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                onBlur={handleBlur}
              />
              <p className="text-red-400 ml-0.5 px-1"> {errors.password}</p>
            </Grid>

            {/* Confirm Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                name="confirm_password"
                type="password"
                value={values.confirm_password}
                onChange={handleChange}
                error={!!errors.confirm_password}
                onBlur={handleBlur}
              />
              <p className="text-red-500 ml-0.5 px-1"> {errors.confirm_password}</p>
            </Grid>

            {/* Role */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  value={values.role}
                  label="Role"
                  name="role"
                  variant="outlined"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value='rider' >Rider</MenuItem>
                  <MenuItem value='driver'>Driver</MenuItem>
                </Select>
              </FormControl>
              <p className="text-red-400 ml-0.5 px-1"> {errors.role}</p>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
              <p className="font-medium ">You have already account <span> <Link className='text-green-500 cursor-pointer' to={'/login'}> login</Link></span></p>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default Register;

import { Container, Box, Typography, TextField, Button, } from '@mui/material';
import { useFormik } from "formik";
import { LoginSchema } from './LoginSchema';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface formValues {
  email : string,
  password : string ,
}

const loginValues: formValues = {
  email: "",
  password: "",
}

const Login = () => {

  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit, } = useFormik({
    initialValues: loginValues,
    validationSchema: LoginSchema,
    onSubmit :  async(values, action)=>{ {
      try {
        const response = await axios.post("http://localhost:8080/users/login", values);
        const token = response.data.token; 

        
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id ; 
        const userRole = decodedToken.role ;

        console.log("Logged in user ID:", userId);
        console.log("Logged in user role:", userRole);

        alert("Login Successful");
        navigate("/ride"); 
      } catch (error) {
        console.error("Login failed:", error);
        alert("Incorrect email or password");
      } finally {
        action.resetForm();
      }
    }
    },  
  })

  return (

    <Container maxWidth="sm" className='pt-5 pb-10'  >
      <Box my={4} p={3} borderRadius={2} boxShadow={3} className='bg-white shadow-gray-100 mb-20' >
        <img src="../src/assets/logo2.png" alt="Logo" className="max-w-[100%] max-h-[100%] mx-auto mt-2.5 " />
        <Typography variant="h4" gutterBottom className='text-2xl font-medium text-green-700 m-1.5 '>
          Login
        </Typography>
        {/* form  */}
        <form action="" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className='mb-2'>
            <TextField
              label="Email"
              type="email"
              name='email'
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <p className='text-red-400'>{errors.email}</p>
          </div>

          {/* Password input */}
          <div className='mb-5'>
            <TextField
              label="Password"
              type="password"
              name='password'
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <p className='text-red-400'>{errors.password}</p>
          </div>

          {/* Submit button */}
          <Button
            variant="contained"
            fullWidth
            type='submit'
            className=' text-black mb-1.5'

          >
            Login
          </Button>
          <p className='font-medium'> Create a new account <span><Link to={'/signup'} className='text-green-500 cursor-pointer mb-5'>Sign Up</Link></span></p>
        </form>
      </Box>
    </Container>
  )
}

export default Login;

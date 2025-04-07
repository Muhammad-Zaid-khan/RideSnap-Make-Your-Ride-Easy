import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const HomePage = () => {
  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('./src/assets/background.avif')", // Background Image
        }}
      >
     
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      
      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to RideSnap</h1>
        <p className="text-xl mb-8">Your ride, your way. Book a ride now!</p>

        {/* Button to redirect to the login page */}
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
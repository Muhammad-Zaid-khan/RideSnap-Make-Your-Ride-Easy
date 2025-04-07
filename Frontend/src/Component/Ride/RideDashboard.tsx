import { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const RideDashboard = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [rideStatus, setRideStatus] = useState(null);
  const socket = io("http://localhost:8080");

  const getPassengerId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const passengerId = decodedToken.id;
      return passengerId;
    }
    return null;
  };

  const handleRequestRide = async () => {
    const passengerId = getPassengerId(); 
    if (!passengerId) {
      alert("Please log in to request a ride.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/ride/request", {
        passengerId,
        pickUpLocation: pickup,
        dropUpLocation: dropoff,
        latitude: 23.8103,
        longitude: 90.4125,
      });

      const data = response.data;
      setRideStatus(data.message);

      
      socket.emit("rideRequest", {
        passengerId,
        pickup,
        dropoff,
        passengerLocation: { lat: 23.8103, lng: 90.4125 }, 
      });
      console.log("Ride Requested:", data);

      setDriverLocation({ lat: 30.99, lng: 87.0 });
    } catch (error : any) {
      console.error("Error in Requesting:", error);

      if (error.response) {
        
        console.error("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong on the server."}`);
      } else if (error.request) {
       
        console.error("No Response from Server:", error.request);
        alert("No response from the server. Please check your internet connection.");
      } else {
       
        console.error("Request Setup Error:", error.message);
        alert("Something went wrong while setting up the request.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <div className="mb-4">
            <Typography variant="h5">Request a Ride</Typography>
          </div>
          <div className="mb-4">
            <TextField
              label="Pickup Location"
              fullWidth
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-4"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Drop-off Location"
              fullWidth
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="mt-4"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRequestRide}
            className="mt-4"
          >
            Request Ride
          </Button>
          {rideStatus && (
            <Typography variant="body1" className="mt-4">
              {rideStatus}
            </Typography>
          )}
        </CardContent>
      </Card>
      {driverLocation && (
        <LoadScript googleMapsApiKey="AIzaSyBQpc_YiCPcUweWtftDBcReE55vhz9i7Fs">
          <GoogleMap
            center={driverLocation}
            zoom={15}
            mapContainerStyle={{ height: "300px", width: "100%" }}
          >
            <Marker position={driverLocation} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default RideDashboard;
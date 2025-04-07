import { useState, useEffect, useRef } from "react";
import { Button, Card, CardContent, Typography, Switch } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import io from "socket.io-client";

const libraries: ("marker")[] = ["marker"];

const socket = io("http://localhost:8080", {
  reconnectionAttempts: 5,
  timeout: 10000,
  transports: ["websocket"],
});

interface RideRequest {
  passengerId: number;
  pickup: string;
  dropoff: string;
  lat: number;
  lng: number;
}

const DriverDashboard = () => {
  const [available, setAvailable] = useState(false);
  const [location, setLocation] = useState({ lat: 24.8607, lng: 67.0011 });
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const driverMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const rideMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQpc_YiCPcUweWtftDBcReE55vhz9i7Fs",
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    (async () => {
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as any;

      driverMarkerRef.current = new AdvancedMarkerElement({
        position: location,
        title: "Driver Location",
        map: mapRef.current,
      });

      if (rideRequest) {
        rideMarkerRef.current = new AdvancedMarkerElement({
          position: { lat: rideRequest.lat, lng: rideRequest.lng },
          title: "Passenger Pickup Location",
          map: mapRef.current,
        });
      }
    })();
  }, [isLoaded, rideRequest]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        if (available) {
          fetch("/driver/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ driverId: 1, latitude, longitude, available }),
          }).catch((err) => setError("Failed to update driver status." ));
        }

        if (rideAccepted) {
          socket.emit("driverLocationUpdate", {
            driverId: 1,
            location: { lat: latitude, lng: longitude },
          });
        }

        if (driverMarkerRef.current) {
          driverMarkerRef.current.position = { lat: latitude, lng: longitude };
        }
      },
      (err) => {
        setError(`Location Error: ${err.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [available, rideAccepted]);

  useEffect(() => {
    if (available) {
      socket.emit("driverAvailable", { driverId: 1, location });

      socket.on("rideRequest", (ride: RideRequest) => {
        setRideRequest(ride);
      });

      socket.on("connect_error", (err) => {
        setError(`WebSocket Error: ${err.message}`);
      });

    } else {
      setRideRequest(null);
      socket.off("rideRequest");
    }

    return () => {
      socket.off("rideRequest");
      socket.off("connect_error");
    };
  }, [available]);

  const handleAvailabilityToggle = () => {
    setAvailable((prev) => !prev);
  };

  const acceptRide = () => {
    if (!rideRequest) return;

    socket.emit("rideAccepted", {
      driverId: 1,
      rideId: rideRequest.passengerId,
      driverLocation: location,
    });

    alert("Ride Accepted! 🚗 Heading to pickup location...");
    setRideAccepted(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <Typography variant="h5">Driver Dashboard</Typography>

          {error && <Typography color="error">{error}</Typography>}

          <div className="flex items-center justify-between mt-4">
            <Typography>Available for Rides</Typography>
            <Switch checked={available} onChange={handleAvailabilityToggle} />
          </div>

          {rideRequest ? (
            <div className="mt-4">
              <Typography variant="body1">New Ride Request</Typography>
              <Typography variant="body2">Passenger: {rideRequest.passengerId}</Typography>
              <Typography variant="body2">Pickup: {rideRequest.pickup}</Typography>
              <Typography variant="body2">Dropoff: {rideRequest.dropoff}</Typography>
              <Button variant="contained" color="primary" fullWidth onClick={acceptRide} className="mt-2">
                Accept Ride
              </Button>
            </div>
          ) : (
            <Typography className="mt-4">No ride requests yet.</Typography>
          )}
        </CardContent>
      </Card>

      {isLoaded && (
        <GoogleMap
          center={location}
          zoom={14}
          mapContainerStyle={{ height: "300px", width: "100%" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        />
      )}
    </div>
  );
};

export default DriverDashboard;




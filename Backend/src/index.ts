import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import authRoute from './routes/authRoute';
import rideRoutes from "./routes/rideRoutes";
import session from 'express-session';
import passport from 'passport';
import statusRoute from './routes/driverRoute';
import cors from 'cors';
import Ride from "./models/rideModel";
import Driver from "./models/driverStatus";
import { Op } from "sequelize";
import http from "http";
import { Server, Socket } from "socket.io";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET, HEAD, POST, PATCH, PUT, DELETE",
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
try {
    connectDB();
    console.log('Database connected successfully!');
} catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
}

// WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);

    socket.on("rideRequest", (data: any) => {
        console.log("Ride Request Received:", data);
        io.emit("rideRequest", data); // Broadcast to all drivers
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Backend route for ride request
app.post("/ride/request", async (req, res) => {
    const { passengerId, pickUpLocation, dropUpLocation, latitude, longitude } = req.body;

    try {
        const ride = await Ride.create({
            passengerId,
            pickUpLocation,
            dropUpLocation,
            latitude,
            longitude,
            status: "pending",
        });

        const driver = await Driver.findOne({
            where: {
                available: true,
                latitude: { [Op.between]: [latitude - 0.05, latitude + 0.05] },
                longitude: { [Op.between]: [longitude - 0.05, longitude + 0.05] },
            },
        });

        if (driver) {
            ride.driverId = driver.id ?? 0;
            ride.status = "accepted";
            await ride.save();
        }

        res.status(201).json({ message: "Ride requested successfully", ride });
    } catch (error) {
        console.error("Error creating ride:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
    console.log(`Server is working on port 8080`);
});

app.use("/ride", rideRoutes);
app.use('/driver', statusRoute);
app.use("/users", authRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
});


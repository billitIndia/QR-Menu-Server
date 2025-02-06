// server.js
const http = require("http");
const app = require("./src/app");
const config = require("./src/config/environment");
const logger = require("./src/utils/logger");
const connectDB = require("./src/config/database");
const socketIO = require("socket.io");
const { logMenuView } = require("./src/controllers/analytics.controller");

const PORT = config.PORT || 3000;

// Track active viewers per restaurant
const activeViewers = new Map();

const startServer = async () => {
  try {
    await connectDB(config.MONGODB_URI);
    
    const server = http.createServer(app);
    
    const io = socketIO(server, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:5173", "https://menu.billit.in/"],
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    app.get("/api/viewers/:restaurantId", (req, res) => {
      const { restaurantId } = req.params;
      const count = activeViewers.has(restaurantId) ? activeViewers.get(restaurantId).size : 0;
      res.json({ count });
    });
    
    
    io.on("connection", (socket) => {
      logger.info(`New menu view connection: ${socket.id}`);
      let currentRestaurantId = null;
      
      socket.on("view_menu", async ({ restaurantId, deviceInfo }) => {
        try {
          console.log(restaurantId,'sfsfsfsfsf');``
          currentRestaurantId = restaurantId;
          

          if (!activeViewers.has(restaurantId)) {
            activeViewers.set(restaurantId, new Set());
          }
          activeViewers.get(restaurantId).add(socket.id);
          
          const viewerCount = activeViewers.get(restaurantId).size;
          io.emit(`restaurant_viewers_${restaurantId}`, { count: viewerCount });
          
          // Log to database
          await logMenuView(restaurantId, {
            deviceType: deviceInfo?.type || 'unknown',
            browserInfo: deviceInfo?.browser || 'unknown'
          });
          
        } catch (error) {
          logger.error("Error handling menu view:", error);
        }
      });
      
      socket.on("disconnect", () => {
        if (currentRestaurantId && activeViewers.has(currentRestaurantId)) {
          const viewers = activeViewers.get(currentRestaurantId);
          viewers.delete(socket.id);
          
          io.emit(`restaurant_viewers_${currentRestaurantId}`, { 
            count: viewers.size 
          });
          
          if (viewers.size === 0) {
            activeViewers.delete(currentRestaurantId);
          }
        }
      });
    });

    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const router = express.Router();

const port = process.env.PORT || 3333;

app.use(cors());

router.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

const images = [
  "https://avatars.githubusercontent.com/u/38932447?s=40&v=4",
  "https://avatars.githubusercontent.com/u/829690?v=4",
  "https://avatars.githubusercontent.com/u/44933849?v=4",
  "https://avatars.githubusercontent.com/u/34954284?v=4",
];
const names = ["Bks", "Ram", "Shyam", "Hari"];
const actions = ["liked", "commented on", "shared"];
const posts = ["your post", "your photo", "your video"];

// socket configuration
io.on("connection", (socket) => {
  console.log("Connected");

  // On connection, emit a message to the client
  const notification = setInterval(() => {
    const notificationData = {};
    const name = names[Math.floor(Math.random() * names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const post = posts[Math.floor(Math.random() * posts.length)];
    notificationData.image = images[Math.floor(Math.random() * images.length)];
    notificationData.message = `${name} ${action} ${post}`;

    socket.emit("new-notification", notificationData);
  }, 5000 + Math.random() * 5000);

  socket.on("disconnect", () => {
    clearInterval(notification);
    console.log("Disconnected");
  });
});

// express server initialization
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
const Post = require("./models/Post");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelize.sync()
  .then(() => console.log("Conectado a PostgreSQL con Sequelize"))
  .catch(err => console.error("Error al conectar:", err));

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const newPost = await Post.create({ nombre, descripcion });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    await post.destroy();
    res.json({ message: "Post eliminado", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

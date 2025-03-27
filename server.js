const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/api/posts", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM public.manage_posts('SELECT')"
      );
      if (result.rows && result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ message: "No posts found" });
      }
    } catch (error) {
      console.error("Error:", error); // Imprimir error para depuración
      res.status(500).json({ error: error.message });
    }
  });
  
  


  app.post("/api/posts", async (req, res) => {
    const { post_name, post_desc } = req.body;
    console.log(req.body);
    try {
      const result = await pool.query(
        "SELECT * FROM public.manage_posts('INSERT', NULL, $1, $2)",
        [post_name, post_desc]
      );
      console.log(result)
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.delete("/api/posts/:post_id", async (req, res) => {
    const { post_id } = req.params;
    console.log(post_id)
    try {
      const result = await pool.query(
        "SELECT * FROM public.manage_posts('DELETE', $1)",
        [post_id]
      );
      res.json({ message: "Post eliminado", post: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

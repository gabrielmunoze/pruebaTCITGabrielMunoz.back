const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "post",
  timestamps: false,
});

module.exports = Post;

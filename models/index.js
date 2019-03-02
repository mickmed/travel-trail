const Sequelize = require('sequelize')

const db = new Sequelize({
	database: 'my_travels_db', 
	dialect: 'postgres', 
	logging: false,
	operatorsAliases: false	
})

const Op = Sequelize.Op

const Location = db.define('location', {
	name: Sequelize.STRING,
	summary: Sequelize.TEXT,
})

const Image = db.define("image", {
  name: Sequelize.STRING
  image_base64: Sequelize.TEXT
});

Location.hasMany(Image, { onDelete: "cascade" });
Image.belongsTo(Location);

module.exports = {
  db,
  Location,
  Image
};

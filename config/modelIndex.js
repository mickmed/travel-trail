const Sequelize = require('sequelize')

const db = new Sequelize('my_travels_db', 'postgres', 'postgres',{
 
	dialect: 'postgres', 

})

const Op = Sequelize.Op

const Location = db.define('location', {
	city: Sequelize.STRING,
	country: Sequelize.STRING,
	summary: Sequelize.TEXT,
	latitude: Sequelize.FLOAT,
	longitude: Sequelize.FLOAT
})

const Image = db.define("image", {
  name: Sequelize.STRING,
  imageBase64: Sequelize.TEXT
});

Location.hasMany(Image, { onDelete: "cascade" });
Image.belongsTo(Location);

db.sync()
module.exports = {
  db,
  Location,
  Image
};

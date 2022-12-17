import { Sequelize } from "sequelize";
import { config } from "../../config/config.js";
import BookModel from "../Model/book.model.js";
import UserModel from "../Model/user.model.js";

const client = new Sequelize(config.DATABASE_URL, {
    logging: false,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
});

client.authenticate()
    .then(() => console.log('connected to database'))
    .catch((error) => console.log('Unable to connect to the database: ', error));

const UserDB = client.define('user', UserModel, {
    freezeTableName: true
});
const BookDB = client.define('library-book', BookModel);

UserDB.hasMany(BookDB);

client.sync()
    .then(() => console.log('Book table created successfully!'))
    .catch((error) => console.error('Unable to create table : ', error));

export default {BookDB, UserDB};
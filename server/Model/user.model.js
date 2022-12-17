import { DataTypes, Sequelize } from "sequelize";

const UserModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['Admin', 'User'],
        defaultValue: 'User'
    },
}

export default UserModel;
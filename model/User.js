import {Schema, model}from "mongoose"

const UserSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true,

    },
    avatarUrl: String,
},
{
    timestamps: true
}
)

export default model("User", UserSchema) //"User" это название таблицы и UserSchema єто сама модель
// timestamps: true для создания даты

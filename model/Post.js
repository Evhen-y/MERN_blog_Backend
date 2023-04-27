import {Schema, model} from "mongoose"

const PostSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        tupe: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,     
        ref: "User", 
        required: true
    },
    imageUrl: String
},
    {
    timestamps: true
})

export default model('Post', PostSchema) //РОST это название таблицы в базе PostSchema  это наша модель

//type: Schema.Types.ObjectId,  сдесь мы в тип присваеваем ID из базы данных
// ref: "User", сдесь мы находим юзера по ID из Таблицы ЮЗЕРОВ это получается связь таблиц
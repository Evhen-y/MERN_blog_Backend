import {body} from "express-validator"

export const registerValidatior = [
    body("email", "неверный формат почты").isEmail(),
    body("password", "пороль не меньше 5 символов").isLength({min:5}),
    body("fullName", "имя не меньше 3 символов").isLength({min: 3}),
    body("avatarUrl", "не верная ссылка на аватарку").optional().isURL() //не обязательніе данные но если они есть проверяем чтобы пришли УРЛОЙ
 ]
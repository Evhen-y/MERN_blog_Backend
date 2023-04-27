import PostModel from "../model/Post.js"

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })
    
        const post = await doc.save()
    
        res.json(post)
    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать пост"
        })       
    }   
}

export const getAllPosts = async (req, res) =>{
    try {
        const allPost = await PostModel.find().populate("user").exec() //populae связывает наши таблицы и вытягивает все данные с таблицы ЮЗЕР, exec это все сохраняет
        // for(let el of allPost){
        //     for (let el2 in el){
        //         if( el2 === "user"){
        //             for(let el3 in el[el2]){
        //                 // console.log('el[el2]', el[el2])
        //                 // console.log('el3', el3)
        //                 if(el3 === "passwordHash"){
        //                     console.log('el2', el2)
        //                     console.log('el[el2].el3', el[el2].el3)
        //                  delete el[el2].el3
        //                 }
        //             }
        //         }
        //     }
        // }
        res.json(allPost)   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
    
}
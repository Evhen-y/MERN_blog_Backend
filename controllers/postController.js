import PostModel from "../model/Post.js"

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
  const doc =  await PostModel.findByIdAndUpdate({_id: postId}, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        } )
console.log("doc", doc)
      res.json({
            message: "update GOOD"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "not update"
        })
    }
}

export const deletePost = async (req, res) => {

  try {
    const postId = req.params.id
    const doc = await PostModel.findOneAndDelete({
         _id: postId
     }
     )
 console.log("doc", doc)
     if(!doc){
         return res.status(404).json({
             message: "can not find post"
         })
     }else{
         res.json({
             message: "delete GOOD",
             deletePost: doc
         })
     }
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "can not delete"
    })   
  }
}

export const getOnePost = async (req, res) => {
   try {
   const postId = req.params.id
   console.log("postId", postId)
   const doc = await PostModel.findOneAndUpdate(
        {
        _id: postId
        },
        {
        $inc: {viewsCount : 1}
           // $inc добавляет нашему счетчику $inc: {viewsCount : 1} по единичке за кажній візов статьи
          },
          {
              returnDocument: "after"   
        //returnDocument возвращает нашу модель после обновления   "after" обозначает что после обновления
           },{
            new: true
            //new: true для того чтобы вернуть обновленную модель
           }
  
    )

    console.log("doc", doc)
    if(!doc){
        return res.status(404).json({
            message: "статья не найдена"
        })
    }
    res.json(doc)
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message: " не удалось получить статью!!!!."
    })
   }

}

export const createNewPost = async (req, res) => {
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
        console.log(error)
        res.status(500).json({
            message: "Не удалось создать пост"
        })       
    }   
}

export const getAllPosts = async (req, res) =>{
    try {
        const allPost = await PostModel.find().populate("user").exec() 
        //populae связывает наши таблицы и вытягивает все данные с таблицы ЮЗЕР, exec это все сохраняет
     
        res.json(allPost)   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    } 
}

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
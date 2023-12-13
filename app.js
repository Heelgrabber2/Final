import express from 'express'

import {getComics, getComic, AddComic, deleteComic} from './database.js'

const app = express()

app.use(express.json())

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.get("/ComicBooks", async (req,res) => {
  const searchTerm = req.query.searchTerm;
  const comics = await getComics(searchTerm);
  res.render("HomePage.ejs",{
    comics,
  });
})

app.get("/ComicBooks/:id", async (req,res) => {
  const id = req.params.id
  const comic = await getComic(id);
  if(!comic){
    res.status(404).render("ERPage.ejs")
    return
  }
  res.render("SinglePage.ejs",{
    comic
  });
  
})

app.use("/creation", (req,res)=>{
  res.render('Creation.ejs')
})

app.post("/AddBooks",async (req,res) => {
  const {title, contents} = req.body
await AddComic(title,contents)
res.redirect("/ComicBooks")
})


app.post("/ComicBooks/:id/delete",async (req,res) => {
const id = req.params.id
await deleteComic(id)
res.redirect("/ComicBooks")
})

app.use((err, req , res, next) =>{
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () =>{
  console.log("Server is running on port 8080")
})
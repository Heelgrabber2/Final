import express from 'express'

import {getNotes, getNote, createNote, deleteNote} from './database.js'

const app = express()

app.use(express.json())

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.get("/notes", async (req,res) => {
  const searchTerm = req.query.searchTerm;
  const notes = await getNotes(searchTerm);
  res.render("HomePage.ejs",{
    notes,
  });
})

app.get("/notes/:id", async (req,res) => {
  const id = req.params.id
  const note = await getNote(id);
  if(!note){
    res.status(404).render("ERPage.ejs")
    return
  }
  res.render("SinglePage.ejs",{
    note
  });
  
})

app.use("/creation", (req,res)=>{
  res.render('Creation.ejs')
})

app.post("/Cnotes",async (req,res) => {
  const {title, contents} = req.body
await createNote(title,contents)
res.redirect("/notes")
})


app.post("/notes/:id/delete",async (req,res) => {
const id = req.params.id
await deleteNote(id)
res.redirect("/notes")
})

app.use((err, req , res, next) =>{
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () =>{
  console.log("Server is running on port 8080")
})
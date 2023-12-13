import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE

}).promise()


export async function getComics(searchTerm){
  if(!searchTerm){
  const [rows] = await pool.query('SELECT * FROM comiclist')
  return rows;
  }
  else{
    const [rows] = await pool.query(`
    SELECT * 
    FROM comiclist
    WHERE title LIKE ?`, [searchTerm +'%'])
  return rows;
  }
}

export async function getComic(id){
  const [rows] = await pool.query(`
  SELECT * FROM 
  comiclist WHERE 
  id = ?
  `,[id])
  return rows[0]
}

export async function AddComic(title, content){
  const result = await pool.query(`
  INSERT INTO comiclist (title, contents) 
  VALUES (?, ?)
  `, [title,content])
  const id = result.insertId
  return getComic(id)
}

export async function deleteComic(id){
  const result = await pool.query(`
  DELETE FROM 
  comiclist WHERE 
  id = ?
  `, [id])
}

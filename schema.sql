CREATE DATABASE notes_app;
Use notes_app;

CREATE Table notes(
  id integer PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  contents TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title, contents)
Values
('My First Note', 'Anote about something'),
('My Second Note', 'Anote about something else');
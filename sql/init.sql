CREATE TABLE userInfo (
    id serial PRIMARY KEY, 
    user_name varchar(20), 
    password varchar(20)
    );

CREATE TABLE rockChildren (
    id serial,
    first_name varchar(20),
    last_name varchar(20),
    quote text,
    type varchar(20),
    color varchar(20),
    gender varchar(20),
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES userInfo(id)
    ON DELETE SET NULL
);

-- CREATE TABLE reviews (
--     id serial,

-- );
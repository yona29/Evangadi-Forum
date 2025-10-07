-- Users table
CREATE TABLE IF NOT EXISTS users (
    userid INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,   
    email VARCHAR(100) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    PRIMARY KEY (userid)
);


--Community Group table
CREATE TABLE IF NOT EXISTS groups (
  groupid INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(150) UNIQUE,
  description TEXT,
  is_demo BOOLEAN DEFAULT FALSE,
  created_by INT UNSIGNED DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (groupid),
  FOREIGN KEY (created_by) REFERENCES users(userid) ON DELETE SET NULL
);

--Connects User to Community Group table
CREATE TABLE IF NOT EXISTS user_groups (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userid INT UNSIGNED NOT NULL,
    groupid INT UNSIGNED NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE,
    FOREIGN KEY (groupid) REFERENCES groups(groupid) ON DELETE CASCADE,
    UNIQUE (userid, groupid) -- prevents joining the same group twice
);

--

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT UNSIGNED NOT NULL,
   group INT UNSIGNED NULL, --to link question to a group
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
    answerid INT UNSIGNED NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL,
    userid INT UNSIGNED NOT NULL,
    answer TEXT NOT NULL,
    PRIMARY KEY (answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);



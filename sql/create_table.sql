CREATE TABLE user_game(
	user_id UUID NOT NULL PRIMARY KEY,
	user_name VARCHAR(50) NOT NULL,
	user_pass VARCHAR(50) NOT NULL,
	admin boolean NOT NULL
);

CREATE TABLE user_biodata(
	user_biodata_id UUID NOT NULL,
	fullname VARCHAR(50),
	email VARCHAR(50),
	phone_number BIGINT,
	user_id UUID REFERENCES user_game(user_id) 
);

CREATE TABLE user_history(
	user_history_id UUID NOT NULL,
	game VARCHAR(50),
	score INTEGER,
	user_id UUID REFERENCES user_game(user_id) 
);
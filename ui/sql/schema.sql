/*foreign keys are disabled by default, so we need to turn it on if we need it*/
PRAGMA foreign_keys = ON;

/*
stats table
mode, has to be one of the modes you define. 
Currently must be one of [user, only_matched_patterns, letter_frequency, entropy, tfidf], but you can add to this list
if you implement your own algorithms or want to use different naming schemes.

win, using an integer to represent true/false. 1 means this game was won, 0 means it was lost
num_guesses is the number of guesses used for this game. If the game was not won, the number of guesses should be 6

created, DATETIME type, automatically set by SQL engine to current date/time.
*/
CREATE TABLE stats(
    ROWID INTEGER PRIMARY KEY,
    mode VARCHAR(40) NOT NULL,
    win INTEGER NOT NULL,
    num_guesses INTEGER NOT NULL,
    completed DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT UNIQUE NOT NULL
);

CREATE TABLE user_stats(
    UserID INTEGER,
    GamesWon INTEGER DEFAULT 0,
    GamesPlayed INTEGER DEFAULT 0,
    TotalGuesses INTEGER DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
)
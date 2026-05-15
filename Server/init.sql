CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    passport TEXT NOT NULL,
    discord TEXT NOT NULL,
    age TEXT,
    about TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

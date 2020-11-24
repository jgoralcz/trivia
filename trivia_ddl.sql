CREATE TABLE IF NOT EXISTS trivia_table (
  question TEXT PRIMARY KEY NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  difficulty TEXT,
  correct_answer TEXT,
  incorrect_answers TEXT ARRAY NOT NULL,
  id SERIAL
);
-- intentionally denormalized
CREATE INDEX IF NOT EXISTS difficulty_idx ON trivia_table(difficulty);
CREATE INDEX IF NOT EXISTS category_idx ON trivia_table(category);
CREATE INDEX IF NOT EXISTS type_idx ON trivia_table(type);

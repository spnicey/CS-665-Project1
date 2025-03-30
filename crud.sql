--create operation example
INSERT INTO Plays (playerID, gameID, Score) VALUES
(6, 3, 218700);			--insert a new play into the plays table (Charlie with a score of 218700 on Time Crisis)

--read operation example
SELECT playerID, score FROM Plays
WHERE gameID = 3
ORDER BY score DESC;        --get scores and player IDs for all plays of Time Crisis (ordered by score desc)

--update operation example
UPDATE Players
SET balance = balance + 10.00
WHERE playerID = 3;		--deposit $10 into charlie's account

--delete operation example
DELETE FROM Plays
WHERE playID = 28;      --delete the play with playID = 28
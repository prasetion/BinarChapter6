SELECT * FROM "user_games";

SELECT * FROM "user_histories";

SELECT user_histories.game, user_histories.score,  user_biodata.full_name
FROM user_histories
INNER JOIN user_biodata
ON user_histories.user_id = user_biodata.user_id;


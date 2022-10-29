const queryHome = `SELECT *
FROM (
  SELECT DISTINCT(t.team_name) AS 'name',
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3 ELSE 0 END)
+ SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS 'totalPoints',
COUNT(m.home_team) AS 'totalGames',
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS 'totalVictories',
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS 'totalDraws',
SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS 'totalLosses',
SUM(m.home_team_goals) AS 'goalsFavor',
SUM(m.away_team_goals) AS 'goalsOwn',
SUM(m.home_team_goals - m.away_team_goals) AS 'goalsBalance',
-- SUM(m.home_team_goals) - SUM(m.away_team_goals) AS 'goalsBalance',
ROUND(CAST(SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3 ELSE 0 END)
+ SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED) /
(CAST(COUNT(m.home_team) * 3 AS UNSIGNED) * 100) * 10000, 2) AS 'efficiency'
FROM matches AS m
INNER JOIN teams AS t
ON t.id = m.home_team
WHERE m.in_progress = false
GROUP BY t.team_name
    ) AS sub 
GROUP BY sub.name
ORDER BY totalPoints DESC, goalsBalance DESC, totalVictories DESC, goalsFavor DESC, goalsOwn ASC;`;

export default queryHome;

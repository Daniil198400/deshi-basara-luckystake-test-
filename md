




Task 1
SELECT *
FROM payment.payment
WHERE status IN ('ERROR', 'FAILED', 'DECLINED');



Task 2
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS failed_payments_count,
  SUM(amount) AS total_amount_lost
FROM payment.payment
WHERE status IN ('FAILED', 'ERROR', 'DECLINED')
GROUP BY month
ORDER BY month;



Task 3
SELECT *,
  CASE
    WHEN p.birth_date IS NULL THEN 'unknown'
    WHEN EXTRACT(YEAR FROM AGE(p.birth_date)) < 18 THEN 'Under 18'
    WHEN EXTRACT(YEAR FROM AGE(p.birth_date)) BETWEEN 18 AND 25 THEN '18–25'
    WHEN EXTRACT(YEAR FROM AGE(p.birth_date)) BETWEEN 26 AND 35 THEN '26–35'
    WHEN EXTRACT(YEAR FROM AGE(p.birth_date)) BETWEEN 36 AND 50 THEN '36–50'
    ELSE 'UNKNOWN'
  END AS age_group
FROM crm.player p
WHERE p.test = false;


Task 4
SELECT
  site_id,
  SUM(total_real_bet - total_real_win) AS total_ggr
FROM casino.game_round
WHERE updated_at >= DATE_TRUNC('month', NOW() - INTERVAL '3 months')
  AND player_id IS NOT NULL
GROUP BY site_id
ORDER BY total_ggr DESC;



Task 6
SELECT
  g.friendly_name AS game_name,
  g.type AS game_type,
  g.rtp,
  SUM(gr.total_real_bet - gr.total_real_win) AS total_ggr
FROM casino.game_round gr
JOIN casino.game g ON g.id = gr.game_id
GROUP BY g.friendly_name, g.type, g.rtp
ORDER BY total_ggr DESC
LIMIT 10;

answer about correletion between ggr and rtp:
player had 100$, lost 60 in spin games,
provider gets 60% (60$) as ggr, player gets 40% (40$) as winback



Task 8: 
SELECT DISTINCT p.id
FROM player p
JOIN payment pay
  ON pay.player_id = p.id
 AND pay.status = 'success'
LEFT JOIN game_round gr
  ON gr.player_id = p.id
WHERE gr.id IS NULL;




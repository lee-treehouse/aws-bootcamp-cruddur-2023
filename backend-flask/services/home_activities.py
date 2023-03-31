from datetime import datetime, timedelta, timezone
from lib.db import pool, query_wrap_array

from opentelemetry import trace

tracer = trace.get_tracer("home.activities")
class HomeActivities:
  def run(cognito_user_id=None):
    with tracer.start_as_current_span("return mock data"):

      now = datetime.now(timezone.utc).astimezone()

      span = trace.get_current_span()
      span.set_attribute("app.now", now.isoformat())

      sql = query_wrap_array("""
      SELECT
        activities.uuid,
        activities.message,
        activities.replies_count,
        activities.reposts_count,
        activities.likes_count,
        activities.reply_to_activity_uuid,
        activities.expires_at,
        activities.created_at
      FROM public.activities
      ORDER BY activities.created_at DESC
      """)

      print("**here is the sql**")
      print(sql)
      
      with pool.connection() as conn:
        with conn.cursor() as cur:
          cur.execute(sql)
          # this will return a tuple
          # the first field being the data
          json = cur.fetchall()
          print("****")
          print(json)
          print("****")
      return json
      
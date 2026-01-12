# cleanup.py
import os
import psycopg2
from datetime import date, timedelta

def cleanup_old_bookings():
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        raise Exception("DATABASE_URL is required")

    conn = psycopg2.connect(db_url)
    try:
        with conn.cursor() as cur:
            today = date.today()
            last_sunday = today - timedelta(days=today.weekday() + 1)
            cur.execute("""
                DELETE FROM bookings 
                WHERE date <= %s AND status IN ('confirmed', 'cancelled')
            """, (last_sunday.isoformat(),))
            conn.commit()
            print(f"[CLEANUP] Deleted records up to {last_sunday}")
    finally:
        conn.close()

if __name__ == "__main__":
    cleanup_old_bookings()
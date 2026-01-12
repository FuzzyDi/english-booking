import sqlite3

# Подключаемся к базе
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Проверяем, существует ли столбец 'attended'
cursor.execute("PRAGMA table_info(bookings)")
columns = [info[1] for info in cursor.fetchall()]

if 'attended' not in columns:
    print("Добавляем столбец 'attended'...")
    cursor.execute("ALTER TABLE bookings ADD COLUMN attended INTEGER")
    print("Готово!")
else:
    print("Столбец 'attended' уже существует.")

conn.commit()
conn.close()
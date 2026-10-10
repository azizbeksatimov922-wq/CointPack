import sqlite3

def init_db():
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            telegram_id INTEGER PRIMARY KEY,
            username TEXT,
            full_name TEXT,
            coins INTEGER DEFAULT 0,
            is_premium BOOLEAN DEFAULT 0,
            is_vip BOOLEAN DEFAULT 0,
            card_type TEXT DEFAULT 'standard'
        )
    """)
    conn.commit()
    conn.close()

def get_user(telegram_id):
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
    user = cursor.fetchone()
    conn.close()
    return user

def add_user(telegram_id, username, full_name, is_premium=False):
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR IGNORE INTO users (telegram_id, username, full_name, is_premium)
        VALUES (?, ?, ?, ?)
    """, (telegram_id, username, full_name, is_premium))
    conn.commit()
    conn.close()

def update_coins(telegram_id, amount):
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET coins = coins + ? WHERE telegram_id = ?", (amount, telegram_id))
    conn.commit()
    conn.close()

def transfer_coins(sender_id, receiver_username, amount):
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    
    # Qabul qiluvchini topish
    cursor.execute("SELECT telegram_id, coins FROM users WHERE username = ?", (receiver_username,))
    receiver = cursor.fetchone()
    
    if not receiver:
        conn.close()
        return False, "Bunday foydalanuvchi topilmadi!"
    
    # Jo'natuvchining balansi
    cursor.execute("SELECT coins FROM users WHERE telegram_id = ?", (sender_id,))
    sender_coins = cursor.fetchone()[0]
    
    if sender_coins < amount:
        conn.close()
        return False, "Sizda yetarli coin mavjud emas!"
        
    # O'tkazma amali
    cursor.execute("UPDATE users SET coins = coins - ? WHERE telegram_id = ?", (amount, sender_id))
    cursor.execute("UPDATE users SET coins = coins + ? WHERE telegram_id = ?", (amount, receiver[0]))
    
    conn.commit()
    conn.close()
    return True, "O'tkazma muvaffaqiyatli amalga oshirildi!"

def set_vip(telegram_id):
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET is_vip = 1 WHERE telegram_id = ?", (telegram_id,))
    conn.commit()
    conn.close()

def get_all_users():
    conn = sqlite3.connect("bot_database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT telegram_id, username, full_name, coins, is_vip, card_type FROM users")
    users = cursor.fetchall()
    conn.close()
    return users
import sqlite3
import flask
import pathlib
def dict_factory(cursor, row):
    """Convert database row objects to a dictionary keyed on column name.

    This is useful for building dictionaries which are then used to render a
    template.  Note that this would be inefficient for large queries.
    """
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

def get_db():
    """Open a new database connection.

    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    if 'sqlite_db' not in flask.g:
        db_filename = pathlib.Path(__file__).parent / "db.sqlite3"
        flask.g.sqlite_db = sqlite3.connect(str(db_filename))
        flask.g.sqlite_db.row_factory = dict_factory
        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")
    return flask.g.sqlite_db

def get_db_connection():
    conn = sqlite3.connect('db.sqlite3', check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def check_user_exists(username):
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE Username = ?', (username,)).fetchone()
    conn.close()
    return user
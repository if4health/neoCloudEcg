def get_database():
    import os
    from dotenv import load_dotenv, find_dotenv
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    import pymongo

    load_dotenv(find_dotenv())

    db_env = {
        "DB_HOST" : os.environ.get("DB_HOST"),
        "DB_PORT" : os.environ.get("DB_PORT"),
        "DB_NAME" : "learning_db",
        "DB_USER" : os.environ.get("DB_USER"),
        "DB_PASS" : os.environ.get("DB_PASS")
    }
    # print(db_env)

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    conn_str = "mongodb://"+db_env['DB_USER']+":"+db_env['DB_PASS']+"@"+db_env['DB_HOST']+":"+db_env['DB_PORT']+"/?authSource=admin"
    # CONNECTION_STRING = "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/myFirstDatabase"

    print (conn_str)
    dbClient = MongoClient(conn_str)

    print (dbClient)

    # Create the database for our example (we will use the same database throughout the tutorial
    return dbClient[db_env['DB_NAME']]
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()

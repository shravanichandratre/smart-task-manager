from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager

# PostgreSQL connection URL
DATABASE_URL = "postgresql://postgres:abhishek@localhost/smart-task-manager-db"

# Create engine
engine = create_engine(DATABASE_URL)

# SessionLocal will be used to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get the database session
# This is the get_db function
def get_db():
    db = SessionLocal()  # Create a new session
    try:
        yield db  # Yield the session to be used in the route
    finally:
        db.close()  # Close the session when done

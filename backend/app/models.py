from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database import Base

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, server_default=func.now())  # Automatically sets the current time
    task = Column(String)
    completed = Column(Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<Task(id={self.id}, task={self.task}, created_at={self.created_at})>"


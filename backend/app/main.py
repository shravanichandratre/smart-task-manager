# main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Task
from app.database import get_db
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend to access backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model for input validation
class TaskCreate(BaseModel):
    id: int = None # You can omit this if the ID is generated automatically in the database
    created_at: datetime = None # Default value for created_at
    task: str
    completed: bool = None

# Create a task
@app.post("/tasks/", response_model=TaskCreate)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    print("Received task:", task)  # Log the received task data
    db_task = Task(task=task.task)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# Get all tasks
@app.get("/tasks/", response_model=list[TaskCreate])
def read_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

# Update task endpoint
@app.put("/tasks/{task_id}", response_model=TaskCreate)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    print("task db", db_task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update the completed field
    db_task.completed = task.completed
    print("task.completed", db_task.completed)

    try:
        db.commit()  # Ensure commit is executed
        db.refresh(db_task)  # Ensure data is refreshed from the database
    except Exception as e:
        db.rollback()  # Rollback if an error occurs
        print("Error during commit:", e)  # Log the error
        raise HTTPException(status_code=500, detail="Database commit failed")

    return db_task


# Delete a task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"detail": "Task deleted successfully"}

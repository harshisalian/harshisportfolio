import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Any, Optional
from email.message import EmailMessage
import smtplib

from schemas import ContactMessage
from database import create_document

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/api/hello")
def hello():
    return {"message": "Hello from the backend API!"}

@app.post("/contact")
def submit_contact(payload: ContactMessage) -> dict[str, Any]:
    """Save JSON contact submissions to the database (no file)."""
    try:
        inserted_id = create_document("contactmessage", payload)
        # also attempt to send email without attachment if SMTP is configured
        _send_email(
            subject=f"New Contact: {payload.subject}",
            body=f"Name: {payload.name}\nEmail: {payload.email}\n\n{payload.message}",
            attachment=None,
            attachment_filename=None,
        )
        return {"status": "ok", "id": inserted_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/contact/upload")
async def submit_contact_with_file(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    image: Optional[UploadFile] = File(None),
) -> dict[str, Any]:
    """Multipart form to accept an optional image file and email it."""
    try:
        # Save to DB
        payload = ContactMessage(name=name, email=email, subject=subject, message=message)
        inserted_id = create_document("contactmessage", payload)

        attachment_bytes = None
        attachment_name = None
        if image is not None:
            attachment_bytes = await image.read()
            attachment_name = image.filename

        # Send email if SMTP configured
        _send_email(
            subject=f"New Contact (with file): {subject}",
            body=f"Name: {name}\nEmail: {email}\n\n{message}",
            attachment=attachment_bytes,
            attachment_filename=attachment_name,
        )

        return {"status": "ok", "id": inserted_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def _send_email(subject: str, body: str, attachment: Optional[bytes], attachment_filename: Optional[str]) -> None:
    """Send an email using SMTP settings if available.
    Environment variables required:
      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
    Recipient defaults to HARSHITHA_EMAIL if set, else uses SMTP_FROM.
    """
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_from = os.getenv("SMTP_FROM")
    recipient = os.getenv("HARSHITHA_EMAIL", "harshisalian3003@gmail.com")

    # If essential SMTP vars are missing, skip sending silently
    if not (smtp_host and smtp_user and smtp_pass and smtp_from):
        return

    msg = EmailMessage()
    msg["From"] = smtp_from
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.set_content(body)

    if attachment and attachment_filename:
        msg.add_attachment(attachment, maintype="application", subtype="octet-stream", filename=attachment_filename)

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


@app.get("/test")
def test_database():
    """Test endpoint to check if database is available and accessible"""
    response = {
        "backend": "✅ Running",
        "database": "❌ Not Available",
        "database_url": None,
        "database_name": None,
        "connection_status": "Not Connected",
        "collections": []
    }
    
    try:
        # Try to import database module
        from database import db
        
        if db is not None:
            response["database"] = "✅ Available"
            response["database_url"] = "✅ Configured"
            response["database_name"] = db.name if hasattr(db, 'name') else "✅ Connected"
            response["connection_status"] = "Connected"
            
            # Try to list collections to verify connectivity
            try:
                collections = db.list_collection_names()
                response["collections"] = collections[:10]  # Show first 10 collections
                response["database"] = "✅ Connected & Working"
            except Exception as e:
                response["database"] = f"⚠️  Connected but Error: {str(e)[:50]}"
        else:
            response["database"] = "⚠️  Available but not initialized"
            
    except ImportError:
        response["database"] = "❌ Database module not found (run enable-database first)"
    except Exception as e:
        response["database"] = f"❌ Error: {str(e)[:50]}"
    
    # Check environment variables
    response["database_url"] = "✅ Set" if os.getenv("DATABASE_URL") else "❌ Not Set"
    response["database_name"] = "✅ Set" if os.getenv("DATABASE_NAME") else "❌ Not Set"
    
    return response


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

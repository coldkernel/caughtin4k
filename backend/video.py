import os
import time
import cv2
import easyocr
import shutil
from fastapi import UploadFile, HTTPException
from .utils import clean_ocr_results

# Initialize OCR reader once (global scope to avoid reloading)
reader = easyocr.Reader(['en'])

async def process_video(file: UploadFile):
    print(f"📹 Processing Video: {file.filename}")
    
    temp_filename = f"temp_{int(time.time())}_{file.filename}"
    
    try:
        # Step A: Save Video Temporarily
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Step B: Frame Extraction Loop
        cap = cv2.VideoCapture(temp_filename)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_interval = int(fps) # 1 frame per second
        
        extracted_usernames = set()
        count = 0
        
        print("🎞️ Extracting frames & Running OCR...")
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            if count % frame_interval == 0:
                # Step C: OCR Scanning
                result = reader.readtext(frame)
                for (bbox, text, prob) in result:
                    if prob > 0.5:
                        clean_text = text.lower().strip()
                        # Basic filtering for username-like strings
                        if " " not in clean_text and len(clean_text) > 3 and ":" not in clean_text:
                            # Filter out common UI words
                            if clean_text not in ["follow", "remove", "following", "message", "search", "posts", "followers"]:
                                extracted_usernames.add(clean_text)
            count += 1
            
        cap.release()
        print(f"✅ OCR Complete. Found {len(extracted_usernames)} raw strings.")
        
        # Step D: Clean & Filter
        cleaned_usernames = clean_ocr_results(list(extracted_usernames))
        print(f"🧹 Cleaned to {len(cleaned_usernames)} potential usernames.")

        # Convert to format expected by analysis
        suspects_data = []
        for username in cleaned_usernames:
            suspects_data.append({
                "username": username,
                "full_name": "OCR Detected" 
            })
            
        # Limit to top 40 for AI (slightly higher for video to allow AI to filter noise)
        suspects_data = suspects_data[:40]
        
        # Step E: Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
            
        return suspects_data

    except Exception as e:
        print(f"Video Processing Failed: {e}")
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        raise HTTPException(status_code=500, detail=str(e))

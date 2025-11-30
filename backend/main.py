from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .auth import session
from .scraper import scan_profile_logic
from .video import process_video
from .analysis import analyze_with_ai

app = FastAPI()

# --- CORS MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class ScanRequest(BaseModel):
    target_username: str
    target_gender: str # "male" or "female"

# --- ROUTES ---

@app.on_event("startup")
async def startup_event():
    try:
        session.ensure_login()
    except Exception as e:
        print(f"Startup login warning: {e}")

@app.post("/scan")
async def scan_profile(request: ScanRequest):
    # 1. Scrape & Filter
    data = await scan_profile_logic(request.target_username, request.target_gender)
    
    # 2. AI Analysis
    ai_result = analyze_with_ai(
        data["suspects_data"], 
        target_gender=request.target_gender,
        target_full_name=data["target_info"]["full_name"],
        target_biography=data["target_info"].get("biography", "")
    )
    
    # 3. Merge & Return
    final_threats = []
    for threat in ai_result.get("suspects", []):
        # Find original profile pic if available
        original = next((s for s in data["suspects_data"] if s["username"] == threat["username"]), None)
        final_threats.append({
            "username": threat["username"],
            "reason": threat.get("reason", "Suspicious"),
            "profile_pic_url": original["profile_pic_url"] if original else ""
        })

    return {
        "status": "success", 
        "loyalty_score": ai_result.get("loyalty_score", 0),
        "verdict": ai_result.get("verdict_summary", "Analysis Complete."),
        "general_overview": ai_result.get("general_overview", ""),
        "ai_enhanced_analysis": ai_result.get("ai_enhanced_analysis", ""),
        "target_info": data["target_info"],
        "suspects": final_threats
    }

@app.post("/analyze-video")
async def analyze_video_endpoint(
    file: UploadFile = File(...), 
    target_gender: str = Form(...),
    target_full_name: str = Form("")
):
    # 1. Process Video & OCR
    suspects_data = await process_video(file)
    
    # 2. AI Analysis
    ai_result = analyze_with_ai(
        suspects_data, 
        target_gender=target_gender, 
        source="video",
        target_full_name=target_full_name
    )
    
    return {
        "status": "success",
        "loyalty_score": ai_result.get("loyalty_score", 0),
        "verdict": ai_result.get("verdict_summary", "Video Analysis Complete."),
        "target_info": ai_result.get("target_info", {
            "username": "Video Scan",
            "full_name": "Private Account",
            "profile_pic": ""
        }),
        "suspects": ai_result.get("suspects", [])
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

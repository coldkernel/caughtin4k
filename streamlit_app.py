import streamlit as st
import asyncio
import json
from backend.scraper import scan_profile_logic
from backend.analysis import analyze_with_ai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Page Config
st.set_page_config(
    page_title="Caught in 4K",
    page_icon="📸",
    layout="centered"
)

# Custom CSS for a modern look
st.markdown("""
    <style>
    .stButton>button {
        width: 100%;
        background-color: #FF4B4B;
        color: white;
        font-weight: bold;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        border: none;
    }
    .stButton>button:hover {
        background-color: #FF2B2B;
        color: white;
    }
    .reportview-container {
        background: #0E1117;
    }
    </style>
    """, unsafe_allow_html=True)

# Header
st.title("📸 Caught in 4K")
st.markdown("### AI-Powered Infidelity Detection")
st.markdown("Enter an Instagram username to scan their following list and detect suspicious activity.")

# Sidebar for Secrets/Config
with st.sidebar:
    st.header("Configuration")
    st.info("Ensure API Keys are set in Streamlit Secrets or .env")
    
    # Check for keys
    if "OPENAI_API_KEY" not in os.environ and "OPENAI_API_KEY" not in st.secrets:
        st.error("Missing OPENAI_API_KEY")
    
    if "IG_USER" not in os.environ and "IG_USER" not in st.secrets:
        st.warning("Missing IG_USER (Required for deep scan)")

# Input Form
with st.form("scan_form"):
    target_username = st.text_input("Instagram Username", placeholder="e.g. cristiano")
    target_gender = st.selectbox("Target Gender", ["male", "female"], index=0)
    
    submitted = st.form_submit_button("🔍 Scan Profile")

async def run_scan(username, gender):
    try:
        with st.spinner(f"🕵️ Scanning @{username}... This may take a minute."):
            # 1. Scrape Data
            scan_data = await scan_profile_logic(username, gender)
            
            st.success("Scan Complete! Analyzing with AI...")
            
            # 2. AI Analysis
            ai_result = analyze_with_ai(
                scan_data["suspects_data"],
                target_gender=gender,
                target_full_name=scan_data["target_info"]["full_name"],
                target_biography=scan_data["target_info"].get("biography", "")
            )
            
            return scan_data, ai_result
            
    except Exception as e:
        st.error(f"An error occurred: {e}")
        return None, None

if submitted:
    if not target_username:
        st.error("Please enter a username.")
    else:
        # Run Async Loop
        scan_data, ai_result = asyncio.run(run_scan(target_username, target_gender))
        
        if ai_result:
            # Display Results
            st.divider()
            
            # Score Card
            score = ai_result.get("loyalty_score", 0)
            color = "green" if score > 80 else "orange" if score > 50 else "red"
            
            col1, col2 = st.columns([1, 3])
            with col1:
                st.markdown(f"<h1 style='text-align: center; color: {color};'>{score}</h1>", unsafe_allow_html=True)
                st.markdown("<p style='text-align: center;'>Loyalty Score</p>", unsafe_allow_html=True)
            with col2:
                st.subheader(ai_result.get("verdict_title", "Verdict"))
                st.write(ai_result.get("verdict_summary", ""))

            # Suspects List
            st.subheader("🚩 Top Suspects")
            suspects = ai_result.get("suspects", [])
            
            if not suspects:
                st.info("No major threats found.")
            
            for s in suspects:
                with st.expander(f"{s.get('username')} - {s.get('reason', 'Suspicious')}"):
                    st.write(f"**Reason:** {s.get('reason')}")
                    if s.get("profile_pic_url"):
                        st.image(s.get("profile_pic_url"), width=50)

            # Raw Data (Optional)
            with st.expander("View Raw JSON"):
                st.json(ai_result)

from typing import List
from .config import MALE_KEYWORDS, FEMALE_KEYWORDS, IGNORE_WORDS

def detect_gender(fullname: str, username: str) -> str:
    """
    Detects gender based on fullname and username using keyword matching.
    Returns 'male', 'female', or 'unknown'.
    """
    text = (fullname + " " + username).lower()
    words = set(text.replace("_", " ").replace(".", " ").split())
    
    if not words.isdisjoint(MALE_KEYWORDS):
        return "male"
    if not words.isdisjoint(FEMALE_KEYWORDS):
        return "female"
    return "unknown"

def clean_ocr_results(raw_text_list: List[str]) -> List[str]:
    """
    Cleans raw OCR text results to extract potential usernames.
    """
    cleaned = set()
    for text in raw_text_list:
        text = text.lower().strip()
        # Remove special chars except _ and .
        text = "".join(c for c in text if c.isalnum() or c in "._")
        
        if len(text) < 3: continue
        if text in IGNORE_WORDS: continue
        if " " in text: continue # Likely a name, not a username
        
        cleaned.add(text)
    return list(cleaned)

def compact_followers_list(suspects_data: List[dict]) -> List[str]:
    """
    Compacts the followers list into a list of strings 'username (fullname)'
    to save tokens and provide context to AI.
    """
    compact_list = []
    for s in suspects_data:
        username = s.get("username", "unknown")
        full_name = s.get("full_name", "")
        
        entry = username
        if full_name and full_name.lower() != username.lower():
             entry += f" ({full_name})"
        
        compact_list.append(entry)
    return compact_list

def extract_surname(fullname: str) -> str:
    """
    Extracts the surname (last word) from a full name.
    Returns empty string if no full name is provided.
    """
    if not fullname:
        return ""
    parts = fullname.strip().split()
    if len(parts) > 1:
        return parts[-1].lower()
    return ""

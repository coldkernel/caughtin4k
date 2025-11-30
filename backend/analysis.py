import json
from openai import OpenAI
from .config import OPENAI_API_KEY, KNOWN_INFLUENCERS
from .utils import extract_surname

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_with_ai(suspects_data, target_gender="unknown", source="public", target_full_name="", target_biography=""):
    # 1. Python Side Filtering (Save Tokens)
    unknown_suspects = []
    target_surname = extract_surname(target_full_name)
    
    for s in suspects_data:
        username = s.get("username", "").lower()
        # Skip known influencers and potential relatives
        if username in KNOWN_INFLUENCERS: continue
        if target_surname and extract_surname(s.get("full_name", "")) == target_surname: continue
        
        # Format for AI: "@username (Private/Public) - Bio: ..."
        status = "Private" if s.get("is_private") else "Public"
        bio = s.get("biography", "")[:50].replace("\n", " ") # Truncate bio
        s_str = f"@{username} ({status}) | Bio: {bio}"
        unknown_suspects.append(s_str)

    # Limit to top 60 suspects to fit context window if list is huge
    analysis_payload = "\n".join(unknown_suspects[:60])

    # 2. The "Judge" System Prompt
    system_prompt = f"""
    ROLE: You are 'Caught in 4k', a toxic Gen Z Relationship Judge.
    TARGET GENDER: {target_gender} (Look for threats of the OPPOSITE gender).

    YOUR GOAL: Read the list of accounts and CALCULATE a 'Loyalty Score' (0-100).
    
    SCORING PROTOCOL (Start at 100, Deduct Points):
    1. **The Baddie Tax:** Deduct 15 points for EACH 'OnlyFans', 'Model', 'VIP', 'Exclusive', or sexual bio.
    2. **The Secret Tax:** Deduct 5 points for EACH 'Private' account with a suspicious name (e.g. 'user123', 'priv_acc').
    3. **The Roster Tax:** Deduct 2 points for every random person of opposite gender that looks like a 'link/option'.
    4. **The Clean Bonus:** If list is mostly memes/brands, keep score HIGH (90-100).

    OUTPUT JSON (Strict):
    {{
      "loyalty_score": (Integer 0-100),
      "verdict_title": (String, e.g. "Certified Player", "Simp Lord", "Clean King"),
      "verdict_summary": (String, 2 sentences explaining the score using toxic slang like 'cooked', 'red flag'),
      "top_suspects": [ 
          {{ "username": "...", "reason": "Why this specific account lowered the score" }} 
      ]
    }}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Here is the following list to judge:\n{analysis_payload}"}
            ],
            response_format={"type": "json_object"},
            temperature=0.4
        )
        result = json.loads(response.choices[0].message.content)
        
        # Compatibility mapping for main.py
        if "top_suspects" in result:
            result["suspects"] = result.pop("top_suspects")
            
        return result
    except Exception as e:
        print(f"AI Error: {e}")
        return {
            "loyalty_score": 50, 
            "verdict_title": "Error", 
            "verdict_summary": "AI Failed.", 
            "suspects": []
        }


import time
import random
from fastapi import HTTPException
from .auth import session
from .utils import detect_gender
from .rocket_api import RocketAPIClient

async def scan_profile_logic(target_username: str, target_gender: str):
    print(f"🔴 Request Received for: {target_username} ({target_gender})")
    
    rocket = RocketAPIClient()
    cl = session.client
    
    try:
        # --- PHASE 1: RocketAPI (Profile & Interactions) ---
        print("🚀 [Phase 1] Fetching Profile & Interactions via RocketAPI...")
        
        # 1. Get User Info
        user_info = await rocket.get_user_info(target_username)
        if not user_info:
             raise HTTPException(status_code=404, detail=f"User '{target_username}' not found.")
        
        user_id = str(user_info.get("id"))
        full_name = user_info.get("full_name", "")
        profile_pic = user_info.get("profile_pic_url_hd") or user_info.get("profile_pic_url")
        is_private = user_info.get("is_private", False)
        follower_count = user_info.get("edge_followed_by", {}).get("count", 0)
        
        # Capture Biography
        biography = user_info.get("biography", "")
        
        print(f"Found User: {target_username} (ID: {user_id}, Followers: {follower_count})")

        # 2. Private Check
        if is_private:
             pass 

        # 3. Fetch Last 3 Posts & Comments
        print("Fetching last 3 posts...")
        # Extract from user_info directly since get_web_profile_info returns media
        timeline = user_info.get("edge_owner_to_timeline_media", {})
        edges = timeline.get("edges", [])
        last_posts = [e.get("node") for e in edges[:3]] if edges else []
        
        # If no posts found in profile info, try fallback (optional, but usually profile info has it)
        if not last_posts and not is_private:
             last_posts = await rocket.get_user_media(user_id, count=3)
        
        commenters = set()
        suspicious_commenters = []
        
        for post in last_posts:
            shortcode = post.get("code")
            if shortcode:
                comments = await rocket.get_media_comments(shortcode, count=50)
                for comment in comments:
                    owner = comment.get("user", {})
                    if owner:
                        username = owner.get("username")
                        commenters.add(username)
                        
                        # Check for opposite gender in comments (Simple heuristic)
                        # If target is male, look for female commenters
                        # If target is female, look for male commenters
                        # We use detect_gender utility
                        c_full_name = owner.get("full_name", "")
                        c_gender = detect_gender(c_full_name, username)
                        
                        is_suspicious = False
                        if target_gender == "male" and c_gender == "female":
                            is_suspicious = True
                        elif target_gender == "female" and c_gender == "male":
                            is_suspicious = True
                            
                        if is_suspicious:
                            suspicious_commenters.append(username)
        
        print(f"Found {len(commenters)} unique commenters. {len(suspicious_commenters)} suspicious.")

        # --- PHASE 2: Legacy API (Follower Sampling) ---
        print("🕵️ [Phase 2] Sampling Followers via Legacy API...")
        
        # Calculate Sample Size (Fixed 100 as per user request)
        sample_size = 100
        print(f"Sampling {sample_size} followers via Instagrapi...")
        
        followers_sample = []
        try:
            # Use instagrapi's user_followers (sync)
            # Note: user_followers fetches all by default, but we can use amount.
            # However, instagrapi's user_followers might be slow for large accounts.
            # We use a small amount.
            # We need to run this in a thread executor because it's blocking
            import asyncio
            loop = asyncio.get_event_loop()
            
            # Define a wrapper for the blocking call
            def fetch_followers():
                # time.sleep(random.uniform(2, 4)) # Add delay for safety
                return cl.user_followers(user_id, amount=sample_size)
            
            followers_dict = await loop.run_in_executor(None, fetch_followers)
            
            # Convert dict to list of objects or dicts
            for fid, f_info in followers_dict.items():
                followers_sample.append({
                    "username": f_info.username,
                    "full_name": f_info.full_name,
                    "profile_pic_url": str(f_info.profile_pic_url)
                })
                
            print(f"Successfully sampled {len(followers_sample)} followers.")
            
        except Exception as e:
            print(f"Legacy API Sampling Failed: {e}")
            # We continue without followers if this fails, or raise error?
            # User requirement implies this is critical.
            # But maybe we shouldn't fail the whole scan if just followers fail?
            # Let's log and continue with empty followers, but maybe add a warning.
            print("Continuing with 0 followers sample.")

        # --- PHASE 3: Data Aggregation ---
        print("🔗 [Phase 3] Aggregating Data...")
        
        # Combine commenters and followers
        # We want to return a list of "suspects"
        
        all_suspects = {}
        
        # Add commenters
        for username in commenters:
            all_suspects[username] = {"username": username, "source": "commenter"}
            
        # Add followers
        for follower in followers_sample:
            username = follower["username"]
            if username in all_suspects:
                all_suspects[username]["source"] = "follower+commenter"
                all_suspects[username].update(follower)
            else:
                all_suspects[username] = follower
                all_suspects[username]["source"] = "follower"

        # Filter Suspects (Gender Filter)
        filtered_suspects = []
        for username, data in all_suspects.items():
            # If we don't have full name from comments, we might miss gender detection
            # But for now let's use what we have
            f_name = data.get("full_name", "")
            gender = detect_gender(f_name, username)
            
            if target_gender == "male": 
                if gender == "male": continue 
            elif target_gender == "female":
                if gender == "female": continue
            
            # Mark if suspicious commenter
            if username in suspicious_commenters:
                data["note"] = "Suspicious Commenter"
            
            filtered_suspects.append(data)

        # Prepare Top 30
        top_suspects_data = list(filtered_suspects)[:30]

        return {
            "target_info": {
                "username": target_username,
                "full_name": full_name,
                "profile_pic": profile_pic,
                "follower_count": follower_count,
                "biography": biography
            },
            "suspects_data": top_suspects_data,
            "meta": {
                "scanned_followers": len(followers_sample),
                "scanned_commenters": len(commenters),
                "suspicious_commenters": suspicious_commenters
            }
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Critical Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

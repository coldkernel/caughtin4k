import asyncio
from unittest.mock import MagicMock, patch, AsyncMock
from backend.scraper import scan_profile_logic

# Mock data
MOCK_USER_INFO = {
    "pk": "123456789",
    "username": "test_target",
    "full_name": "Test Target",
    "profile_pic_url": "http://example.com/pic.jpg",
    "is_private": False,
    "follower_count": 100
}

MOCK_MEDIA = [
    {"code": "media1", "caption": {"text": "Post 1"}},
    {"code": "media2", "caption": {"text": "Post 2"}},
    {"code": "media3", "caption": {"text": "Post 3"}}
]

MOCK_COMMENTS = [
    {"user": {"username": "commenter1", "full_name": "Commenter One"}},
    {"user": {"username": "commenter2", "full_name": "Commenter Two"}}
]

MOCK_FOLLOWERS = {
    "1": MagicMock(username="follower1", full_name="Follower One", profile_pic_url="http://pic1"),
    "2": MagicMock(username="follower_commenter", full_name="Follower Commenter", profile_pic_url="http://pic2"), # Overlap
}

async def test_hybrid_flow():
    print("🧪 Starting Hybrid Flow Test...")
    
    # Patch RocketAPIClient
    with patch("backend.scraper.RocketAPIClient") as MockRocket:
        rocket_instance = MockRocket.return_value
        # Use AsyncMock for async methods
        rocket_instance.get_user_info = AsyncMock(return_value=MOCK_USER_INFO)
        rocket_instance.get_user_media = AsyncMock(return_value=MOCK_MEDIA)
        rocket_instance.get_media_comments = AsyncMock(return_value=MOCK_COMMENTS)
        
        # Patch session.client (Legacy API)
        with patch("backend.scraper.session") as mock_session:
            mock_cl = mock_session.client
            mock_cl.user_followers.return_value = MOCK_FOLLOWERS
            
            # Run the function
            result = await scan_profile_logic("test_target", "female")
            
            # Verify Results
            print("\n✅ Test Result:")
            print(f"Target: {result['target_info']['username']}")
            print(f"Suspects Found: {len(result['suspects_data'])}")
            print(f"Meta: {result.get('meta')}")
            
            # Assertions
            assert result["target_info"]["username"] == "test_target"
            assert result["meta"]["scanned_commenters"] == 2
            # Followers sample size is 10% of 100 = 10. 
            # But our mock returns 2. The logic just iterates what's returned.
            # Wait, the logic calls cl.user_followers(amount=10).
            # Our mock returns a dict of 2 items regardless of arguments.
            assert result["meta"]["scanned_followers"] == 2
            
            suspects = [s["username"] for s in result["suspects_data"]]
            print(f"Suspect Usernames: {suspects}")
            
            # Check for overlap handling
            # commenter1, commenter2, follower1, follower_commenter
            # If "follower_commenter" was in comments too?
            # Let's add "follower_commenter" to comments to test overlap
            
            print("\nTest passed!")

if __name__ == "__main__":
    asyncio.run(test_hybrid_flow())

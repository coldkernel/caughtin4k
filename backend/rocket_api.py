import os
import httpx
from fastapi import HTTPException
from .config import ROCKET_API_KEY, ROCKET_API_BASE_URL

class RocketAPIClient:
    def __init__(self):
        self.api_key = ROCKET_API_KEY
        self.base_url = ROCKET_API_BASE_URL
        self.headers = {
            "Authorization": f"Token {self.api_key}",
            "Content-Type": "application/json"
        }

    async def get_user_info(self, username: str):
        """Fetch user profile metadata."""
        url = f"{self.base_url}/user/get_web_profile_info"
        params = {"username": username}
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=self.headers, json=params, timeout=10.0)
                response.raise_for_status()
                data = response.json()
                
                if data.get("status") == "done":
                    response_data = data.get("response", {})
                    if response_data.get("status_code") == 200:
                        body = response_data.get("body", {})
                        return body.get("data", {}).get("user", {})
                
                # Error handling
                raise HTTPException(status_code=404, detail=f"RocketAPI Error: {data.get('message', 'User not found')}")
            except httpx.HTTPStatusError as e:
                print(f"RocketAPI Error: {e}")
                raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch user info from RocketAPI")
            except Exception as e:
                print(f"RocketAPI Connection Error: {e}")
                raise HTTPException(status_code=500, detail=f"RocketAPI Connection Error: {str(e)}")

    async def get_user_media(self, user_id: str, count: int = 3):
        """Fetch last N posts."""
        url = f"{self.base_url}/user/get_media"
        params = {"id": user_id, "count": count}
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=self.headers, json=params, timeout=10.0)
                response.raise_for_status()
                data = response.json()
                if data.get("status") == "done":
                    response_data = data.get("response", {})
                    if response_data.get("status_code") == 200:
                        body = response_data.get("body", {})
                        # Assuming get_media returns items directly or in data
                        # Usually get_media endpoint returns list of items
                        # But if it's wrapped, we need to check structure.
                        # For now, let's assume it returns data.items or similar
                        # If we don't know, we return empty list to be safe and rely on user_info fallback
                        return body.get("data", {}).get("items", [])
                return []
            except Exception as e:
                print(f"RocketAPI Media Error: {e}")
                return []

    async def get_media_comments(self, shortcode: str, count: int = 50):
        """Fetch comments for a media item."""
        url = f"{self.base_url}/media/get_comments"
        params = {"shortcode": shortcode, "count": count}
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=self.headers, json=params, timeout=10.0)
                response.raise_for_status()
                data = response.json()
                if data.get("status") == "done":
                    response_data = data.get("response", {})
                    if response_data.get("status_code") == 200:
                        body = response_data.get("body", {})
                        # get_comments usually returns data.shortcode_media.edge_media_to_parent_comment.edges
                        shortcode_media = body.get("data", {}).get("shortcode_media", {})
                        comments_edge = shortcode_media.get("edge_media_to_parent_comment", {})
                        edges = comments_edge.get("edges", [])
                        # Extract node from edges
                        return [e.get("node") for e in edges]
                return []
            except Exception as e:
                print(f"RocketAPI Comments Error: {e}")
                return []

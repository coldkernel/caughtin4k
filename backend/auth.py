import os
import time
import random
from instagrapi import Client
from .config import IG_USER, IG_PASS, SESSION_FILE

class InstagramSession:
    _instance = None
    client: Client = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(InstagramSession, cls).__new__(cls)
            cls._instance.client = Client()
        return cls._instance

    def ensure_login(self):
        print("Attempting login...")
        if os.path.exists(SESSION_FILE):
            try:
                print(f"Loading session from {SESSION_FILE}...")
                self.client.load_settings(SESSION_FILE)
                self.client.login(IG_USER, IG_PASS)
                print("Login successful using session.")
                return
            except Exception as e:
                print(f"Session login failed: {e}")
                print("Falling back to credential login...")
        
        try:
            time.sleep(random.uniform(2, 5))
            self.client.login(IG_USER, IG_PASS)
            self.client.dump_settings(SESSION_FILE)
            print("Login successful using credentials. Session saved.")
        except Exception as e:
            print(f"Critical Login Failure: {e}")
            # In a real app, we might want to raise an exception here, 
            # but for now we'll just log it and let the caller handle failures.

# Global instance
session = InstagramSession()

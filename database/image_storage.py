from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Import to format the JSON responses
# ==============================
import json

# Set configuration parameter: return "https" URLs by setting secure=True  
# ==============================
config = cloudinary.config(secure=True)

# Log the configuration
# ==============================
# print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")
print("Logged in")

result = cloudinary.Search().expression('folder:oaxaca/*').sort_by("public_id","desc").execute()


def get_all_urls():
    result = cloudinary.Search().expression('folder:oaxaca/*').sort_by("public_id","desc").execute()
    resources = result["resources"]
    urls = [i['secure_url'] for i in resources]
    print(urls)

get_all_urls()
from dotenv import load_dotenv
load_dotenv()

import cloudinary
import cloudinary.uploader
import cloudinary.api
import json

config = cloudinary.config(secure=True)

print("Cloud name: " + config.cloud_name)

result = cloudinary.Search().expression('folder:oaxaca/*').sort_by("public_id","desc").execute()


def get_all_urls():
    result = cloudinary.Search().expression('folder:oaxaca/*').sort_by("public_id","desc").execute()
    resources = result["resources"]
    urls = [i['secure_url'] for i in resources]
    return urls

# get_all_urls()
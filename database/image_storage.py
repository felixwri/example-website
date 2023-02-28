from dotenv import load_dotenv
load_dotenv()

import cloudinary
import cloudinary.uploader
import cloudinary.api

config = cloudinary.config(secure=True)

print("Cloud name: " + config.cloud_name)

def get_all_urls():
    result = cloudinary.Search().expression('folder:oaxaca/*').sort_by("public_id","desc").execute()
    resources = result["resources"]
    urls = [i['secure_url'] for i in resources]
    return urls

# get_all_urls()

def upload_image(id, image):
    # print(image)
    print("Upload")

    result = cloudinary.uploader.upload(image, folder="oaxaca")
    print(result["secure_url"])

    if result is not None:
        return {"success": True, "url": result["secure_url"]}
    else:
        return {"success": False, "url": None}
    
def delete_image(url):
    public_name = url.split("/")[-1]
    public_id = public_name.split(".")[0]
    print(public_id)
    result = cloudinary.uploader.destroy(public_id)
    print(result)
import requests
import os

url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hanuman_carrying_Dronagiri_mountain.jpg/320px-Hanuman_carrying_Dronagiri_mountain.jpg"
output_dir = "public"
output_file = os.path.join(output_dir, "logo.jpg")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    with open(output_file, "wb") as f:
        f.write(response.content)
    print("Download successful")
except Exception as e:
    print(f"Error: {e}")

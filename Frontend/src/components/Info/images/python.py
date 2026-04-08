from PIL import Image
import requests
from io import BytesIO

# Image URL
url = "https://www.electronicwings.com/storage/PlatformSection/TopicContent/296/description/Raspberry%20Pi%203%20hardware(0).png"

# Download image
response = requests.get(url)
img = Image.open(BytesIO(response.content)).convert("RGBA")

data = img.getdata()

newData = []
for item in data:
    # remove only white background
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))  # transparent
    else:
        newData.append(item)

img.putdata(newData)
img.save("output.png")

print("✅ Done! Saved as output.png")
import time
import RPi.GPIO as gpio
import requests

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

# Pin setup for the LED
led1 = 5  # Pin connected to the LED
gpio.setup(led1, gpio.OUT, initial=0)

# URL for API request
url = "http://cloud.xtranssolutions.com/node/api/channels/67b6e477f2420137ed9b1d2c/entries/read"

# Function to check the API and toggle the LED accordingly
def check_api():
    while True:
        try:
            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()  # Convert response to JSON
                entries = data.get("entries", [])  # Get the "entries" array safely

                if entries:  # Check if entries list is not empty
                    last_entry = entries[-1]  # Get the last entry
                    print("Last Entry:", last_entry)

                    # Extract "toggle" value if available
                    toggle_value = next((item["value"] for item in last_entry.get("fieldData", []) if item["name"] == "toggle"), None)

                    if toggle_value is not None:
                        # Toggle LED based on the toggle value
                        print(toggle_value)
                        if toggle_value == "1":
                            gpio.output(led1, True)
                            print("LED1 ON")
                        else:
                            gpio.output(led1, False)
                            print("LED1 OFF")
                    else:
                        print("Toggle field not found in the last entry.")
                else:
                    print("No entries found.")
            else:
                print(f"Failed to fetch data. Status Code: {response.status_code}")

            time.sleep(3)  # Read every 3 seconds

        except requests.exceptions.RequestException as e:
            print("Error:", e)
            time.sleep(5)  # Wait before retrying

# Start checking the API and toggling the LED
check_api()

# Cleanup GPIO settings before exiting (this is never reached unless KeyboardInterrupt occurs)
gpio.cleanup()

import requests

def download_image(url, save_path):
    """
    Download an image from a URL and save it to the specified path.
    
    Args:
        url (str): URL of the image to download
        save_path (str): Path where the image will be saved
    """
    try:
        # Send GET request to the URL
        response = requests.get(url, stream=True)
        
        # Check if request was successful
        response.raise_for_status()
        
        # Save the image
        with open(save_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
                
        print(f"Image successfully downloaded and saved to {save_path}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return False

# Example usage
if __name__ == "__main__":
    image_url = "https://image.pollinations.ai/prompt/cat"
    output_path = "downloaded_image.jpg"
    download_image(image_url, output_path)
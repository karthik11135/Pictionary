import requests

def get_random_word():
    url = "https://random-word-api.vercel.app/api?words=1"
    response = requests.get(url)
    return response.text;

# print(transform_generated_word(word))





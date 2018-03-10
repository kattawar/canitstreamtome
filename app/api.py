import json as json
def movieapi(title):
    if title == "ToyStory":
        out ="""{
    "title": "Toy story",
    "description": "A movie about real life toys",
    "rating": "8.3",
    "cast": "Bob smith, Joe montego, Sally nick",
    "top_countries": [
        "United States",
        "Canada"
    ],
    "streaming_services": [
        "Netflix",
        "Amazon Video"
    ],
    "poster_url": "https://movies.com/picture_url"
}
"""
        d = json.loads(out)
        print(d)
        return d


        
        

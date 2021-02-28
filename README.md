# trivia REST API
5200+ multiple choice trivia questions in a REST API. You can use the live instance at `beta-trivia.bongo.best`

---
### How to Use:
There are a few ways to get your trivia question 
1) By id 1-5200

**Example**
```$xslt
GET /2 HTTP/1.1
Host: ip:port
Connection: keep-alive
cache-control: no-cache
```
**Example Response**
```$xslt
[
    {
        "question": "In the 2011 TV anime series, &quot;THE iDOLM@STER&quot;, what was the name of Iori&#039;s stuffed toy bunny?",
        "category": "Entertainment: Japanese Anime & Manga",
        "type": "multiple",
        "difficulty": "medium",
        "correct_answer": "Charles",
        "incorrect_answers": [
            "Bubsy",
            "Kero",
            "Usagi"
        ],
        "id": 2
    }
]
```
2) By random and with filters
 - search
 - category `(Entertainment | Sports | Science | Animals | General Knowledge | Mythology | Politics | Geography | History)`
 - difficulty `(easy | medium | hard)`
 - type `(boolean | multiple)`
 - limit `(1-10)`

**Example**
```$xslt
GET /?search=cat&category=entertainment&type=multiple&difficulty=medium&limit=10
Host: ip:port
Connection: keep-alive
cache-control: no-cache
```
**Example Response**
```$xslt
[
    {
        "question": "This movie contains the quote, &quot;What we&#039;ve got here is a failure to communicate.&quot;",
        "category": "Entertainment: Film",
        "type": "multiple",
        "difficulty": "medium",
        "correct_answer": "Cool Hand Luke",
        "incorrect_answers": [
            "Bonnie and Clyde",
            "The Graduate",
            "In the Heat of the Night"
        ],
        "id": 2479
    },
    {
        "question": "In the game &quot;Cave Story,&quot; what is the character Balrog&#039;s catchphrase?",
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "medium",
        "correct_answer": "Huzzah!",
        "incorrect_answers": [
            "Oh yeeaaah!",
            "Whoa there!",
            "Nyeh heh heh!"
        ],
        "id": 3080
    }
    .
    .
    .
]
```

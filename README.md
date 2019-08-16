# game-20
[![Build Status](https://travis-ci.org/Lekky71/billable-hours.svg?branch=master)](https://travis-ci.org/Lekky71/billable-hours)
 
 ##TO RUN
 Start Docker on your machine and run the following 
 ```
 docker build .
 ```
 ```
 docker-copmose up 
 ```
 The app runs on port `3000`.
 
 #IMPLEMENTATION
 The live feature was implemented with socket.io
 
 #SERVER EVENTS
 - start
 <br/>
 
 ```
 {
   "name": "leke",
   "answer": "book",
   "hint": "you see it everyday" (optional)   
 }
 ```

 
 ######Event emitted from server if successful is ``started_game``

- join
 <br/>
 
 ```
 {
   "name": "olu",
   "sessionCode": "fr5w3"
 }
 ```
 ######Event emitted from server if successful is ``joined_game``
 
- answer
 <br/>
 
 ```
 {
   "name": "olu",
   "sessionCode": "fr5w3",
   "answer": "book",
 }
 ```
  ######Event emitted from server if successful is ``answer_received``
  
- ask_question
 <br/>

 ```
 {
    "name": "olu",
    "sessionCode": "fr5w3",
    "question": "is it a common word?",
  }
 ```
 ######Event emitted from server if successful is ``hint_question_received``
 
- answer_question
 <br/>

 ```
 {
   "name": "leke",
   "sessionCode": "fr5w3",
   "answer": "book",
   "questionId": 5
 }
 ```
 ######Event emitted from server if successful is ``hint_answer_received``
 
#####SOCKET SUCCESS
All the emitted success events return this same object
```
{
  "id": 7,
  "playerOne": "Leke",
  "playerTwo": "Doyin",
  "hint": "my name",
  "answer": "leke",
  "sessionCode": "t2LMv",
  "guesses": [
    "book",
    "hello",
    "hellohi"
  ],
  "ended": true,
  "correct": true,
  "createdAt": "2019-08-16T14:30:11.774Z",
  "updatedAt": "2019-08-16T16:53:56.533Z",
  "questions": [
    {
      "id": 30,
      "question": "food?",
      "answer": false,
      "createdAt": "2019-08-16T14:32:56.150Z",
      "updatedAt": "2019-08-16T14:42:52.633Z",
      "sessionId": 7
    },
    {
      "id": 31,
      "question": "hello?",
      "answer": true,
      "createdAt": "2019-08-16T14:46:46.341Z",
      "updatedAt": "2019-08-16T14:47:06.685Z",
      "sessionId": 7
    },
    {
      "id": 32,
      "question": "hello?",
      "answer": false,
      "createdAt": "2019-08-16T14:46:49.178Z",
      "updatedAt": "2019-08-16T14:47:14.242Z",
      "sessionId": 7
    }
  ]
}
```
#####SOCKET FAILURE
For errors, the emitted event is ``failure`` and the object format is
```
{
  "error": "error message gotten"
}
```

####API ENDPOINT
- endpoint to get game session data ``/game_api/game/:sessionCode``
It returns the same success response as above.

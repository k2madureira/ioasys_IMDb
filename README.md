# Ioasys IMDb 🌍

![imdb100](https://user-images.githubusercontent.com/26586585/102727061-1e2a0d00-4302-11eb-9b84-5300443c3348.png)


### Structure:

```
  ioasys_IMDb
    |_ public
        |_ coverage
        |_ Postman
    |_ src
        |_ modules
            |_ User
                  |_ __tests__
                        |_> User.spec.ts
                  |_ controllers
                        |_> UserController.ts
                  |_ dtos
                        |_> ICreateUserDTO.ts
                  |_ models
                        |_> User.ts
                  |_ repositories
                        |_> IUserRepository.ts
            |_ Movie
                 |_ __tests__
                 |_ controllers
                 |_ dtos
                 |_ models
                 |_ repositories


        |_ shared
              |_ database
              |_> app.ts
              |_> bootstrap.ts
              |_> routes.ts
              |_> server.ts
```

### Data schema files JSON:
```
   _____________       ____________________    _______________
  | Users       |     |      Movies       |   |     scores    | 
  |_____________|     |-------------------|   |_______________|
  | (1) id      |     |     (2) id        |   |      id       |
  | name        |     |       title       |   | (1) id_user   |
  | password    |     |      director     |   | (2) id_movie  |
  | nickname    |     |      genre        |   |   score       |
  | admin       |     |      actors       |   |   created_at  |
  | disabled    |     |        year       |   |   updated_at  | 
  | created_at  |     |     created_at    |   |_______________|
  |  updated_at |     |     updated_at    | 
  |_____________|     |___________________|
                    
  
```

### Docs:

1. PostMan (https://documenter.getpostman.com/view/9357385/TVsuBSjU )
2. PostMan Collection ( public/Postman/ioasys.postman_collection.json )
3. docs
4. Code Coverage ( ioasys_IMDb/public/coverage/lcov-report/index.html )
5. Insominia.json

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0117ef5f890e1b344dfd)

### Setting up local environment:

1. Install **Yarn**;
2. Using terminal, navigate to the folder where the project was cloned and run:<br> **git clone https://github.com/k2madureira/ioasys_IMDb.git**
3. Using terminal, access the **ioasys_IMDb** folder and Run **yarn install**, to download all necessary dependencies;
4. Using terminal run **yarn dev:server**, to start the server on port **3333**; (Typescript)
5. For testing, the **insomnia** software is recommended;
6. To perform the unit test **yarn test**

### Tests:
- [x] **Jest**
- [x] **Code coverage**

### code formatter / Extensions:

- [x] **Eslint** (Airbnb)
- [x] **Eslint** (Visual Studio Code - Extension)
- [x] **Prettier**
- [x] **EditorConfig** (Visual Studio Code - Extension)


### Future improvements:

- [ ] Creation of actors, directors and genres tables
- [ ] change of inputs in the insertion of new films, relating to three n * n tables, between actors, directors and genres.

### Endpoints:

|Number| Type | Route | Definition |
|-|------|-------|------------|
|1| *Post* | /login | Login |
|2| *Post* | /user | Create an user |
|3| *Put* | /user/**id** | Update an user |
|4| *Delete* | /user/**:id** | Disabled user |
|5| *Post* | /movie | Register new movie |
|6| *Get* | /movie | List all movies |
|7| *Put* | /movie/**:id** | Update an movie using **id** |
|8| *Get* | /movie/**:id** | Detail an movie using **id** |
|9| *Post* | /movie/**:id**/vote | score a movie using user **id** |




#### Exemples:

1. http://localhost:3333/login **(POST)**

##### Request [ body: JSON]
```
{
	"email":"admin@gmail.com",
	"password": "123"
}
```

##### Response [JSON]

```
{
    "user": {
        "name": "Lenilson Madureira",
        "email": "admin@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDg1MDM1NTgsImV4cCI6MTYwODU4OTk1OCwic3ViIjoiMSJ9.bEu0P1Xqtcz9U4aonou-3Ejyr_DvX1l1Y5CdFO9plKw"
}
 ```

 ------------------------------------------------------------


2. http://localhost:3333/user **(POST)**

##### Request [ body: JSON]
```
{
	"name": "USER",
	"nickname": "USER",
	"email":"user1@user.com",
	"password": "123",
	"admin": false
}
```

##### Response [JSON]

```
{
  "message": "User successfully registered",
  "infos": {
    "id": 2,
    "name": "USER",
	  "nickname": "USER",
	  "email":"user1@user.com"
  }
}
 ```

 ------------------------------------------------------------
 
 3. http://localhost:3333/user/2 **(PUT)**

##### Request [ body: JSON]
```
{
	"name": "USER_UPDATED"
}
```

##### Response [JSON]

```
{
  "User": {
    "id": 2,
    "name": "USER_UPDATED",
	  "nickname": "USER",
	  "email":"user1@user.com"
  }
}
 ```

 ------------------------------------------------------------

4. http://localhost:3333/user/2 **(DELETE)**


##### Response [JSON]

```
{
  "success": "disabled"
}
 ```

 ------------------------------------------------------------

5. http://localhost:3333/movie **(POST)**

##### Request [ body: JSON]
```
{
	"tt": "1414",
	"title": "Gladiator",
	"director":"Ridley Scott",
	"genre": "Action | Adventure | Drama",
	"actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
}
```

##### Response [JSON]

```
{
  "message": "Movie successfully registered ✅",
  "infos": {
    "id": 4,
    "tt": "1414",
    "title": "Gladiator",
    "year": null,
    "director": "Ridley Scott",
    "genre": "Action | Adventure | Drama",
    "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
  }
}
 ```

 ------------------------------------------------------------
 
 6. http://localhost:3333/movie **(GET)**

##### Response [JSON]

```
[
  {
    "id": 1,
    "tt": "4154796",
    "title": "Avengers: Endgame (Vingadores: Ultimato)",
    "year": "2019",
    "director": "Anthony Russo, Joe Russo",
    "genre": "Action, Adventure, Drama",
    "actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    "scores": [
      {
        "id": 1,
        "user_id": 1,
        "movie_id": 1,
        "score": 4,
        "createdAt": "2020-12-19T12:15:54.654Z",
        "updatedAt": "2020-12-19T12:15:54.654Z"
      },
      {
        "id": 2,
        "user_id": 4,
        "movie_id": 1,
        "score": 2,
        "createdAt": "2020-12-19T12:30:45.202Z",
        "updatedAt": "2020-12-19T12:30:45.202Z"
      },
      {
        "id": 3,
        "user_id": 4,
        "movie_id": 1,
        "score": 2,
        "createdAt": "2020-12-20T15:35:48.667Z",
        "updatedAt": "2020-12-20T15:35:48.667Z"
      }
    ]
  },
  {
    "id": 2,
    "tt": "0120815",
    "title": "Saving Private Ryan",
    "year": null,
    "director": " Steven Spielberg",
    "genre": "Drama | War",
    "actors": " Tom Hanks, Matt Damon, Tom Sizemore",
    "scores": []
  },
  {
    "id": 4,
    "tt": "55",
    "title": "Avengers: Endgame (Vingadores: Ultimato)",
    "year": "2019",
    "director": "Anthony Russo, Joe Russo",
    "genre": "Action, Adventure, Drama",
    "actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    "scores": []
  },
  {
    "id": 3,
    "tt": "0172495",
    "title": "Gladiator",
    "year": null,
    "director": "Ridley Scott",
    "genre": "Action | Adventure | Drama",
    "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
    "scores": []
  }
]
 ```

 ------------------------------------------------------------
 

 7. http://localhost:3333/movie/4 **(PUT)**

##### Request [ body: JSON]
```
{
	"tt": "1414",
	"title": "Gladiator",
	"director":"Ridley Scott",
	"genre": "Action | Adventure | Drama",
	"actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
}
```

##### Response [JSON]

```
{
  "Movie": {
    "id": "4",
    "tt": "1414",
	  "title": "Gladiator",
	  "director":"Ridley Scott",
	  "genre": "Action | Adventure | Drama",
	  "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
  }
}
 ```

 ------------------------------------------------------------
 
  8. http://localhost:3333/movie/4 **(GET)**

##### Response [JSON]

```
{{
  "id": 4,
  "tt": "1414",
	"title": "Gladiator",
	"director":"Ridley Scott",
	"genre": "Action | Adventure | Drama",
	"actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
  "genre": "Action | Adventure | Drama",
  "total_votes": 3,
  "average_votes": 2.6666666666666665
}
 ```

 ------------------------------------------------------------
 
 
  9. http://localhost:3333/movie/4/vote **(POST)**
  
##### Request [ body: JSON]
```
{
	"score": 2
}
```

##### Response [JSON]

```
{
  "success": "vote successfully registered"
}
 ```

 ------------------------------------------------------------


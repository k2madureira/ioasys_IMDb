# Ioasys IMDb 🌍
![node](https://user-images.githubusercontent.com/26586585/75612422-f747e380-5b01-11ea-9213-ec9742b66a47.png)

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
  | id_user     |     |     id_movie      |   |               |
  | name        |     |       title       |   |   id_user     |
  | password    |     |      director     |   |   id_movie    |
  | nickname    |     |      genre        |   |   score       |
  | admin       |     |      actors       |   |   created_at  |
  | disabled    |     |        year       |   |   updated_at  | 
  | created_at  |     |     created_at    |   |_______________|
  |  updated_at |     |     updated_at    | 
  |_____________|     |___________________|
                    
  
```

### Docs:

1. PostMan ( )
2. PostMan Collection ( public/Postman/ioasys.postman_collection.json )
3. docs
4. Code Coverage ( ioasys_IMDb/public/coverage/lcov-report/index.html )
5. Insominia.json

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2f774259b17c79834391)

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


### Endpoints:

|Number| Type | Route | Definition |
|-|------|-------|------------|
|1| *Post* | /login | Login |
|2| *Post* | /user | Create an user |
|3| *Put* | /user/**id** | Update an user |
|4| *Delete* | /user/**:id** | Disabled user |
|5| *Get* | /movie | List all movies |
|6| *Post* | /movie | Register new movie |
|7| *Put* | /movie/**:id** | Update an movie using **id** |
|8| *Get* | /movie/**:id** | Detail an movie using **id** |
|9| *Post* | /movie/**:id**/vote | score a movie using user **id** |




#### Exemples:


1. http://localhost:3333/user **(POST)**

##### Request [ body: JSON]
```
{
	"name": "dumy",
  "password": "123",
  "nickname": "bob",
  "admin": true
}
```

##### Response [JSON]

```
{
  "id": "ccf1167d-df15-4281-a68c-3830626b98df",
  "name": "dumy",
  "nickname": "bob"
}
 ```

 ------------------------------------------------------------
 
 2. http://localhost:3333/user/ccf1167d-df15-4281-a68c-3830626b98df **(PUT)**

##### Request [ body: JSON]
```
{
	"name": "Dummy"
}
```

##### Response [JSON]

```
{
  "id": "ccf1167d-df15-4281-a68c-3830626b98df",
  "name": "Dummy",
  "nickname": "bob"
}
 ```

 ------------------------------------------------------------

3. http://localhost:3333/user/disabled/ccf1167d-df15-4281-a68c-3830626b98df **(GET)**


##### Response [JSON]

```
{
  "success": "disabled"
}
 ```

 ------------------------------------------------------------

4. http://localhost:3333/movie **(POST)**

##### Request [ body: JSON]
```
{
	"name": "EXAMPLE",
  "user_id":"ccf1167d-df15-4281-a68c-3830626b98df"
}
```

##### Response [JSON]

```
{
  "id": "94babbaa-2a7e-4874-815b-5ded5b5269f0",
  "name": "EXAMPLE",
  "user": {
    "id": "ccf1167d-df15-4281-a68c-3830626b98df",
    "description": "Nutricionista"
  }
}
 ```

 ------------------------------------------------------------


# Full Stack Open 2019 &mdash; Lessons Exercise
### &mdash; **Notes App** &ndash; **[Frontend](https://github.com/sztxr/FullStackOpen_Lessons/tree/master/frontend) & [Backend](https://github.com/sztxr/FullStackOpen_Lessons/tree/master/backend) code**

### &mdash; **Redux Exercises** (part6):
  - ### [**Counter App with Redux**](https://github.com/sztxr/FullStackOpen_Lessons/tree/112ffcf4674f5cc16c0e9bcf599972f69e1a0ecf/redux-counter)
  - ### [**Simplified Notes App with Redux**](https://github.com/sztxr/FullStackOpen_Lessons/tree/112ffcf4674f5cc16c0e9bcf599972f69e1a0ecf/redux-notes)

### &mdash; **React-router** (part7):
  - ### [**Routed Notes App**](https://github.com/sztxr/FullStackOpen_Lessons/tree/112ffcf4674f5cc16c0e9bcf599972f69e1a0ecf/routed-notes) *(no redux)* + Bootstrap
  - ### [**Routed Notes App**](https://github.com/sztxr/FullStackOpen_Lessons/tree/112ffcf4674f5cc16c0e9bcf599972f69e1a0ecf/routed-notes-semantic) *(no redux)* + Semantic UI
  - ### [**Routed Notes App**]() *(no redux)* + Styled Components

&nbsp;
---

### part2
- `part2-1` &mdash; [**[a]**](https://fullstackopen.com/en/part2/rendering_a_collection_modules) Rendering a collection, modules
- `part2-2` &mdash; [**[b]**](https://fullstackopen.com/en/part2/forms) Forms
- `part2-3` &mdash; [**[c]**](https://fullstackopen.com/en/part2/getting_data_from_server) Getting data from server
- `part2-4` &mdash; [**[d]**](https://fullstackopen.com/en/part2/altering_data_in_server) Altering data in server
- `part2-5` &mdash; [**[e]**](https://fullstackopen.com/en/part2/adding_styles_to_react_app) Adding styles to React app

### part3
- `part3-1` &mdash; [**[a]**](https://fullstackopen.com/en/part3/node_js_and_express) Node.js and Express
- `part3-2` &mdash; [**[b]**](https://fullstackopen.com/en/part3/deploying_app_to_internet) Deploying app to internet
- `part3-3` &mdash; [**[c]**](https://fullstackopen.com/en/part3/saving_data_to_mongo_db) Saving data to MongoDB
- `part3-4` &mdash; [**[d]**](https://fullstackopen.com/en/part3/validation_and_es_lint) Validation and ESLint

### part4
- `part4-1` &mdash; [**[a]**](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing) Structure of backend application, introduction to testing
- `part4-2` &mdash; [**[b]**](https://fullstackopen.com/en/part4/testing_the_backend) Testing the backend
- `part4-3` &mdash; [**[c]**](https://fullstackopen.com/en/part4/user_administration) User administration
- `part4-4` &mdash; [**[d]**](https://fullstackopen.com/en/part4/token_authentication) Token authentication

### part5
- `part5-1` &mdash; [**[a]**](https://fullstackopen.com/en/part5/login_in_frontend) Login in frontend
- `part5-2` &mdash; [**[b]**](https://fullstackopen.com/en/part5/props_children_and_proptypes) props.children and proptypes
- `part5-3` &mdash; [**[c]**](https://fullstackopen.com/en/part5/testing_react_apps) Testing React apps
- `part5-4` &mdash; [**[d]**](https://fullstackopen.com/en/part5/custom_hooks) Custom hooks

### part6
- `part6-1` &mdash; [**[a]**](https://fullstackopen.com/en/part6/flux_architecture_and_redux) Flux-architecture and Redux
- `part6-2` &mdash; [**[b]**](https://fullstackopen.com/en/part6/many_reducers_connect) Many reducers, connect
- `part6-3` &mdash; [**[c]**](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application) Communicating with server in a redux application

### part7
- `part7-1` &mdash; [**[a]**](https://fullstackopen.com/en/part7/react_router) React-router
- `part7-2` &mdash; [**[b]**](https://fullstackopen.com/en/part7/more_about_styles) More about styles
- `part7-3` &mdash; [**[c]**](https://fullstackopen.com/en/part7/webpack) Webpack
- `part7-4` &mdash; [**[d]**](https://fullstackopen.com/en/part7/class_components_e_2_e_testing) Class components, E2E-testing
- `part7-5` &mdash; [**[e]**](https://fullstackopen.com/en/part7/miscellaneous) Miscellaneous
- `part7-6` &mdash; [**[f]**](https://fullstackopen.com/en/part7/exercises_extending_the_bloglist) Exercises: extending the bloglist

&nbsp;
---
---

### File Structure
- **`index.js`** only imports the actual application from the app.js file and then starts the application.
- **`app.js`** creates the actual application, establishes the connection to the database.
- **`controllers/notes.js`** contains all the event handlers of routes related to notes.
- **`models/note.js`** only defines the Mongoose schema for notes.
- **`utils/config.js`** handles the environment variables.
- **`utils/middleware.js`** contains the custom middleware.

&nbsp;
---
---

### HTTP

| URL        | verb   | functionality 
| ---------- | ------ | ------------- |
| notes      | GET    | fetches all resources in the collection
| notes      | POST   | creates a new resource based on the request data
| notes/:id  | GET    | fetches a single resource
| notes/:id  | DELETE | removes the identified resource
| notes/:id  | PUT    | replaces the entire identified resource with the request data
| notes/:id  | PATCH  | replaces a part of the identified resource with the request data

&nbsp;
---
---

### Jest
#### Running individual tests

- Only run test found in the tests/note_api.test.js file:
```
npx jest tests/note_api.test.js --runInBand
```

- The -t option can be used for running tests with a specific name:
```
npx jest -t 'a specific note is within the returned notes'
```

- The provided parameter can refer to the name of the test or the describe block. The parameter can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:
```
npx jest -t 'notes' --runInBand
```

&nbsp;
---
---

### run JSON-server
`npx json-server --port 3001 --watch db.json`

### useEffect to fetch data
```js
  // A compact way of doing it
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
    }, [])

  // A less compact way of doing it
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  console.log('render', notes.length, 'notes')
  // takes two parameters: 1: function (effect), 2: number of times the effect will run
  // if the second parameter is an empty array [], the effect is only run along with the first render of the component
  useEffect(hook, [])
```

# Full Stack Open 2019 &mdash; Lessons Exercise
&mdash; **Notes App** & **Backend code**

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

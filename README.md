# Full Stack Open 2019 - Notes App
This is the code of the Notes App build from the lessons.

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

&nbsp;
---
---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

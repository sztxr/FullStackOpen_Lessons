# async/await

As an example, the fetching of notes from the database with promises looks like this:
### Promises
```js
Note.find({}).then(notes => {
  console.log('operation returned the following notes', notes)
})
```
The Note.find() method returns a promise and we can access the result of the operation by registering a callback function with the then method.

&nbsp;
### Chaining promises
```js
Note.find({})
  .then(notes => {
    return notes[0].remove()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })
```

&nbsp;
### async and await (ES7)
The execution of code pauses at `const notes = await Note.find({})` and waits until the related promise is fulfilled, and then continues its execution to the next line. When the execution continues, the result of the operation that returned a promise is assigned to the notes variable.
```js
const notes = await Note.find({})
console.log('operation returned the following notes', notes)
```

The example from **Chaining promises** could be implemented by using await like this:
```js
const notes = await Note.find({})
const response = await notes[0].remove()

console.log('the first note is removed')
```

There are a few important details to pay attention to when using async/await syntax. In order to use the await operator with asynchronous operations, they have to return a promise. This is not a problem as such, as regular asynchronous functions using callbacks are easy to wrap around promises.

The await keyword can't be used just anywhere in JavaScript code. Using await is possible only inside of an async function.

This means that in order for the previous examples to work, they have to be using async functions. Notice the first line in the arrow function definition:
```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].remove()
  console.log('the first note is removed')
}

main()
```
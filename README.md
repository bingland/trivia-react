# trivia-react
Trivia Game made with React and the Open Trivia DB API. Assignment for DGM 3790

### Assignment requirement checklist

#### 1. Effectively use conditional logic and JavaScript array methods(e.g. Filter, Map, Reduce, Find) to render large lists.

The [Question.js](https://github.com/bingland/trivia-react/blob/master/src/Question.js) component renders whatever question it receives as a prop from [App.js](https://github.com/bingland/trivia-react/blob/master/src/App.js). The current question is determined by the round, so [Question.js](https://github.com/bingland/trivia-react/blob/master/src/Question.js) recieves `questions[round]` as a prop. Game state is managed in [App.js](https://github.com/bingland/trivia-react/blob/master/src/App.js). I do not use JavaScript array methods here because it's not the most efficient way of rendering my questions, but I do use .map on line 67 in [Question.js](https://github.com/bingland/trivia-react/blob/master/src/Question.js) to render "correct" and "incorrect" messages, and on line 12 in [SelectForm.js](https://github.com/bingland/trivia-react/blob/master/src/components/SelectForm.js) to render the different category options when the user is choosing the settings for a game.

#### 2. Encapsulate your code as React functional components.

All of my components are functional components.

#### 3. Work with command-line tools and NPM to create and manage your project within a real development toolset.

I used NPM to manage my project and is shown in the `package-lock.json` and `package.json` files. 

#### 4. Allow communication between components using props and the Context API.

Most of my components use props. The Context API file is located in the context folder is and is named [login-context.js](https://github.com/bingland/trivia-react/blob/master/src/context/login-context.js). The Context API file is used in the [Scoreboard.js](https://github.com/bingland/trivia-react/blob/master/src/Scoreboard.js) component to render the user's username, and in the [Startup.js](https://github.com/bingland/trivia-react/blob/master/src/Startup.js) component to log the user in and out, make an account, and to get the username that has been set. 

#### 5 Present a form for user input that provides useful form validation and feedback.

Pretty much all of my form validation + feedback is located in the [Startup.js](https://github.com/bingland/trivia-react/blob/master/src/Startup.js) component. 

#### 6. Create at least 5 custom components and use it within at least two of your other components.

I have about 11 custom components and I am using many components in many other components.

#### 7. Use a mix of CSS animations and Transition Component transitions to enhance some aspects of your project.

I am using CSS animations in [GameOver.scss](https://github.com/bingland/trivia-react/blob/master/src/scss/_GameOver.scss), [Question.scss](https://github.com/bingland/trivia-react/blob/master/src/scss/_Question.scss), and [Startup.scss](https://github.com/bingland/trivia-react/blob/master/src/scss/_Startup.scss). I tried using the Transition Component but I couldn't get it to work, so it is not in my project.

#### 8. Connect to a server using HTTP and display retrieved data.

In [App.js](https://github.com/bingland/trivia-react/blob/master/src/App.js) I am using axios to make an API call, and I set the data it gives back to me as my questions and numQuestions game state. The URL for the Axios request is made in [Startup.js](https://github.com/bingland/trivia-react/blob/master/src/Startup.js). The [Question.js](https://github.com/bingland/trivia-react/blob/master/src/Question.js) component renders whatever question it receives as a prop from [App.js](https://github.com/bingland/trivia-react/blob/master/src/App.js). The current question is determined by the round, so [Question.js](https://github.com/bingland/trivia-react/blob/master/src/Question.js) recieves `questions[round]` as a prop to render the current question.

#### 9. Provide at least 3 different routes with navigation between them using React Router.

My three routes are `/`, `/signup`, and `/login`. This can be found in [Startup.js](https://github.com/bingland/trivia-react/blob/master/src/Startup.js). 

#### 10. Manage your application's state using Hooks and the Context API.

I use useState to manage my application's state in a lot of my components. The Context API file is located in the context folder is and is named [login-context.js](https://github.com/bingland/trivia-react/blob/master/src/context/login-context.js). The Context API file is used in the [Scoreboard.js](https://github.com/bingland/trivia-react/blob/master/src/Scoreboard.js) component to render the user's username, and in the [Startup.js](https://github.com/bingland/trivia-react/blob/master/src/Startup.js) component to log the user in and out, make an account, and to get the username that has been set. 

#### 11. Structure, document, and deploy your final project code according to common industry practices.

I've structered, documented and deployed (using Netlify) my final project according to common industry practices. 

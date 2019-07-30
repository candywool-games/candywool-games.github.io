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


## [React Bootstrap](https://react-bootstrap.netlify.com/)

This project has React bootstrap installed for convenience.

## Sass Modules

This project uses Sass modules for its CSS.

### [variables.scss](src/styles/variables.scss)

You can add your own global variables in `src/styles/variables.scss`.

### [bootstrap-overrides.scss](src/styles/bootstrap-overrides.scss)

You can override the bootstrap defaults by adding them to `src/styles/bootstrap-overrides.scss`. The full list of bootstrap variables can be found [here](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss).

### [index.scss](src/index.scss)

 Global CSS classes can be added to `src/index.scss`. Then in your HTML you simply need to add `className="your-class-name"`.
 
### Component Modules
 
All component specific CSS should be added at the same level as the `index.tsx` for that component in a file called `index.module.scss`. Inside of `index.tsx` you will need to add `import styles from './index.module.scss';` at the top. To use your module class, you just add `className={styles.yourClass}`; If you want to use global variables from `variables.scss` in your new module, you just need to add `@import "styles/variables.scss";` to the top of `index.module.scss`.


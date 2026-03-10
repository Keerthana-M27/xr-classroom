<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======

# xr-classroom

Extended Reality Classroom Platform


## ER Diagram
<img width="1632" height="962" alt="XR drawio" src="https://github.com/user-attachments/assets/d661603e-88bb-4a46-9f37-c3fc9c5fcce5" />


##  ARCHITETURE
<img width="636" height="1416" alt="XR- Architecture drawio" src="https://github.com/user-attachments/assets/ab9b024b-761e-44f9-b10a-54a5adf2a70b" />

## BOILER PLATE
```
xr-classroom/
├── frontend/
│   ├── public/
│   │   └── index.html          # Main HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Background3D.js      # 3D immersive background
│   │   │   ├── LessonBackground.js  # Lesson page background
│   │   │   ├── Navbar.js            # Navigation component
│   │   │   └── SubjectCard.js       # Subject card component
│   │   ├── games/
│   │   │   ├── AdditionGame.js      # Math - Addition
│   │   │   ├── SubtractionGame.js   # Math - Subtraction
│   │   │   ├── DivisionGame.js      # Math - Division
│   │   │   ├── AlphabetsGame.js     # Language - Alphabets
│   │   │   ├── GrammarGame.js       # Language - Grammar
│   │   │   ├── AnimalsGame.js       # Science - Animals
│   │   │   ├── HumanBodyGame.js     # Science - Human Body
│   │   │   ├── BodyPartsGame.js     # Science - Body Parts
│   │   │   ├── HealthyFoodGame.js   # Science - Healthy Food
│   │   │   ├── ColoursGame.js       # General - Colours
│   │   │   ├── CountriesGame.js     # Geography - Countries
│   │   │   ├── ContinentsGame.js    # Geography - Continents
│   │   │   ├── ComputerGame.js      # Technology - Computer
│   │   │   ├── DrawingGame.js       # Creative - Drawing
│   │   │   ├── CraftGame.js         # Creative - Craft
│   │   │   ├── ExerciseGame.js      # Health - Exercise
│   │   │   └── FunGamesGame.js      # Fun - Mini Games
│   │   ├── App.js               # Main app component & routing
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   └── package-lock.json        # Dependency lock file
│
├── backend/
│   └── backend/
│       ├── node_modules/        # Installed packages
│       ├── classroom.db         # SQLite database file
│       ├── database.js          # Database setup & tables
│       ├── server.js            # Main server entry point
│       ├── package.json         # Backend dependencies
│       └── package-lock.json    # Dependency lock file
│
└── README.md                    # Project documentation
```

## TECH STACK
---

## 🛠️ Tech Stack

### 🖥️ Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Component Library |
| JavaScript | Programming Language |
| CSS3 | Styling & Animations |
| Three.js | 3D Background Environment |

### ⚙️ Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Server-side Runtime |
| Express.js | Web Framework for APIs |
| Socket.IO | Real-time Communication |

### 🗄️ Database
| Technology | Purpose |
|------------|---------|
| SQLite | Lightweight File-based Database |

### 🔐 Security
| Technology | Purpose |
|------------|---------|
| JWT | Token-based Authentication |
| Bcrypt.js | Password Hashing |
| CORS | Cross-origin Security |

### 🛠️ Tools & Environment
| Technology | Purpose |
|------------|---------|
| VS Code | Code Editor |
| Git | Version Control |
| GitHub | Code Repository |
| npm | Package Manager |
| Figma | UI/UX Prototype Design |


## FIGMA
https://www.figma.com/proto/NPgRNR6PvfQcHgM5M01Qfy/Untitled?node-id=3-91&starting-point-node-id=3%3A91&t=vaajgAG5mNOBVUSA-1

## STUDENT DASHBOARD

<img width="1331" height="703" alt="Frame 5" src="https://github.com/user-attachments/assets/c23e7b8f-b798-4aaa-9838-4f14f9b9e554" />

## TEACHER DASHBOARD
<img width="1700" height="875" alt="Frame 10" src="https://github.com/user-attachments/assets/02f1f48e-58df-4a13-ab24-44c2a16037ec" />

---

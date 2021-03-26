# Innowise Lab Internship: Level 2: Mini-paint 

##### Demo Link [https://kovalchuk98.github.io/Innowise-Practice-Level-2/](https://kovalchuk98.github.io/Innowise-Practice-Level-2/)
# Task

####  Task requirements [Link](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit?usp=sharing)

# How to run the app 

#### 1. Clone this repository
```
git clone https://github.com/Kovalchuk98/Innowise-Practice-Level-2.git
```
#### 2. Install all dependencies
```
npm install 
```
#### 3. Start
```
npm run serve 
```

# Database snapshot
```
└── images                              #Main node for DB
       └── user_id                      #User id node    
              └── image_id              #Image node 
                    ├── author          #Author 
                    ├── date            #Date
                    ├── imgUrl          #Image URL
                    └── tsp             #Timestamp
```

# Application stack

- **Vue CLI** - Vue CLI is a full system for rapid Vue.js development.
- **Vuex** - State management pattern + library for Vue.js applications.
- **Vue-router** - The official router for Vue. js .
- **TypeScript** - Open-source language which builds on JavaScript.
- **Firebase** - Google's mobile application development platform that helps you build, improve, and grow your app.
- **Vue-toastification** - Vue notifications made easy,Light, easy and beautiful toasts.

# Project structure
```
└── src                     #Source code folder
      ├── assets            #Images
      ├── components        #All components 
      ├── router            #Routes config file
      ├── store             #Store config files
      ├── types             #Main data types
      ├── views             #Pages for routes
      ├── firebase.ts      #Firebase config file
      └── main.ts          #Entry point 
```

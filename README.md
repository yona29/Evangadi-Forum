THIS PROJECT IS CALLED EVANGADI FORUM

It is an interactive web application (a forum) for Evangadi tech (evangadi.com).

In the Evangadi forum platform members can ask/post quesitons, get answer for their questions, post answer for a question when they sign-up and login. They can also view a single question or all questions.

**API DOCUMENTATION \- Evangadi Forum**

**1 AUTHENTICATION MIDDLEWARE**

**Description:** Checks if the user’s token is valid and authenticates the user.

**Endpoint:** /api/auth  
**Method:** GET  
**Headers:** Authorization: Bearer \<token\>  
**Responses:**

* **Status Code:** 200 OK \- user authenticated successfully  
* **Status Code:** 401 Unauthorized \- Invalid or missing token

**2 SIGN-UP**

**Description:** Registers a new user.

**Endpoint:** /api/user/signup  
**Method:** POST  
**Request Body (JSON):**  
json  
{  
		"Username": "Seble\_Tsegaye",  
		"first\_name": "Seble",  
		"last\_name": "Tsegaye",  
		"email": "example@example.com",  
		"password": "password12345"  
}  
**Responses:**

* **Status Code:** 201 Created \- user registered successfully  
* **Status Code:** 400 Bad Request \- Missing or invalid fields

**3 LOGIN**

**Description:** Authenticates user and returns a token(JWT).

**Endpoint:** /api/user/login  
**Method:** POST  
**Request Body (JSON):**  
json  
{  
		"email": "yonas@example.com",  
		"password": "password12345"  
}  
**Responses:**

* **Status Code:** 200 OK \- Login successful (it returns the token)  
* **Status Code:** 401 Unauthorized \-  Invalid credentials

**4 GET ANSWERS FOR A QUESTION**

**Description:** Fetches answers for a question.

**Endpoint:** api/answer/{question\_id}  
**Method:** GET  
**Path Variable:** question\_id \- The question’s id (integer value)  
**Responses:**

* **Status Code:** 200 OK \- Returns list of answer/s

	json  
	\[  
{  
		"answer\_id": 1,  
		"answer": "This is the first answer",  
"user": "Mulugeta"  
}  
\]

* **Status Code:** 404 Not Found \- The question was not found

**5 POST ANSWERS FOR A QUESTION**

**Description:** Submits an answer for a question.

**Endpoint:** /api/answer  
**Method:** POST  
**Request Body (JSON):**  
	json  
	{  
	"answer": "This is the answer for the question"  
}  
**Responses:**

* **Status Code:** 201 Created \- answer posted successfully  
* **Status Code:** 400 Bad Request \- Missing answer text

**6 GET ALL QUESTIONS**

**Description:** Fetches all the questions.

**Endpoint:** /api/question  
**Method:** GET  
**Responses:**

* **Status Code:** 200 OK \- returns all questions

	json  
	\[  
{  
		"question\_id": 1,  
		"title": "How do you link JQuery in html?",  
"description": "I need help to link JQuery in my html. Can someone help me?"  
}  
\]

* **Status Code:** 404 Not Found \- no questions found

**7 GET SINGLE QUESTION**

**Description:** Fetches specific question.

**Endpoint:** /api/question/{question\_id}  
**Method:** GET  
**Path Variable:** question\_id \- The question’s id (integer value)  
**Responses:**

* **Status Code:** 200 OK \- returns details of the question

	json  
	{  
"question\_id": 1,  
	"title": "How do you link JQuery in html?",  
"description": "I need help to link JQuery in my html. Can someone help me?"  
}

* **Status Code:** 404 Not Found \- That specific question was not found

**8 POST QUESTION**

**Description:** Submits a new question.

**Endpoint:** /api/question  
**Method:** POST  
**Request Body (JSOn):**  
	json  
	{  
	"title": "How do you create a React app?",  
"description": "What are the steps to create a new React app using vite?"  
}  
**Responses:**

* **Status Code:** 201 Created \- Question posted successfully.  
* **Status Code:** 400 Bad Request \- Missing question text



******************************************************************************


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

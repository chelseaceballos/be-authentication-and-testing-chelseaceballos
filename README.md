# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [x] Run `npm install` to install your dependencies.
- [ ] Run tests locally executing `npm test`.

For a step-by-step on setting up Codegrade see [this guide.](https://www.notion.so/lambdaschool/Submitting-an-assignment-via-Code-Grade-A-Step-by-Step-Walkthrough-07bd65f5f8364e709ecb5064735ce374)

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [x] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [x] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `<firstName-lastName>` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

Sessions uses authentication to verify the identity of a client attempting to use a resource (ex.restricted page meant only for admins or specific users). This information is saved by the server in the form of a unique session. So the user can register -> the server verifies registration credentials-> creates session for client-> server creates a unique cookie for client -> client persistently sends cookie with every request  -> server verifies cookie if valid with each request -> if yes(valid), client can access page. -> if not client restricted from accessing resource. (stateless session), best for personal projects


JSON Web Tokens, are a way to transfer information in the form of a json object between server and client.
Flow for JWT: User submits credentials to server -> instead of session id, a json web token is generated ( its three parts being 'header.payload.signature') created with private key on server -> jwt gets sent to client's browser stored in localStorage -> future requests will be verified through authorization header -> server validates signature -> access to resource ( or not :c )


2. What does `bcryptjs` do to help us store passwords in a secure manner?
bycryptjs is a library that helps developers hide plain text passwords by hashing them(disguise passwords). This prevents others stealing sensitive information that may be on a users account if the database has been compromised. It also helps fight against rainbow tables by preventing the reversal of hashed passwords, because bcrypt adds 'salt' as an extra protection layer on top of regular password-hashing

3. How are unit tests different from integration and end-to-end testing?
Unit tests, focus on testing individual modules of an application.
Integration testing, focusses on modules that synchronously work together.
End-to-end, take the longest, test the replication of an applications functionality or performance. Huge focus on user experience


4. How does _Test Driven Development_ change the way we write applications and tests?
TDD or Test Driven Development is a very programmatic way of coding. It creates a "safety net" that will alert the developer if they make a small change(in a previously passing test) that ends up triggering a failing test.

    Step 1- write the least amount / simple code that will trigger failure
    Step 2- write the least amount of code that will pass the test
    Step 3- refactor code, make cleaner / more readable

# Temparary Content:
- Will delete this part after finished the design
- Here is the link of architectural diagram mapping: https://docs.google.com/drawings/d/1pBK20mgLdNgUVLhHKKALNiS4pxQ4sv7EuKy-Pyux50g/edit?usp=sharing
  
<h1>INFO 441 Project: Daily Tarot Card Reader and Journal</h1>

<p>Our project will be a daily Tarot Card reader that allows users to see a card every day as well as add journel entries.</p>

<h2>Project Description</h2>
<p>Our overall target audience would be anybody. Ideally, our project ends up being something that anyone can access and play with easily. More specifically, we would be targetting people that are interested in Tarot. These people would be our main users - people that are invested in seeing how Tarot card readings can help them sort out patterns in different parts of their lives. A reach audience would be people who are interested in astrology, as they tend to gravitate towards Tarot as well.</p>

<p>In terms of our overall project, general people would want to use our application to do a simple tasks everyday for fun. This build from the popularity of Wordle, a daily word guessing game. As noted from many Wordle players, the simpleness of the game made the daily task enjoyable, bringing players back everyday. Additionally, this application gives everyone a way to engage with Tarot as well as create communities within them. It would allow people without Tarot decks or those who can't meet in person to interact. Tarot enthusiasts can find their community online through our application. Overall, our application would provide a fun and easy way to log daily Tarot readings and recall past readings.</p>

<p>As developers, we want to build this application as it provides a fun way to engage with people. Although we are not extremely into Tarot, the cards and readings serve as a conversation starter, and can be interesting. On the development side, we find it easy to start with a minimum viable product and build off of it. Additional features can be added constantly to make the application interesting. We would easily be able to add onto our project and grow it. As a long reach goal, our project could provide a Tarot API for others to use as well. </p>


<h2>Technical Description</h2>

### Achitectural Diagram
### Summary Table

| Priority | User | Description | Techinical Implementation |
|----------|------|-------------|---------------------------|
|P0| As a user | I want to create and log in my account at the Tarot website| When user need to create an account, log in, and log out, use **Microsoft Azure** to implement the authentifation|
|P0| As a user I'd like to request a tarot card every day and receive information about the card. | When user request a tarot card, send a request to **Mongodb** to pick a card at random, and send the result back to the client through a handler. Meanwhile, save this result in Mongodb with a unique user id and date.
|P1| As a user | I  want to be able to draw different types of tarot readings (for example, ones with multiple cards) | When a user requests a tarot reading, send a request to **Mongodb** to pull a radnom assortment of cards depending on the type of readings, and send the result back to the client through a handler. Meanwhile, save this result in Mongodb with a unique user id, reading id, and date.
|P2| As a user | I want to look at past readings I have drawn | When user requests past readings, send a request to **Mongodb** which sends back the full list of tarot readings, and send the result back to client through a handler. 
|P3| As a user | I want to log a journal entried with the readings and review my past jounal entries | When a user creates a jounal entry, send the input back to server and save it along with the tarot reading in **Mongodb**. When users request to view  past jounal, the server make a reqeust to the database and sends the target result back to client |




<h2>NOTE TAKING BELOW</h2>

- Who is your target audience?  Who do you envision using your application? Depending on the domain of your application, there may be a variety of audiences interested in using your application.  You should hone in on one of these audiences.
  - anyone who is interested in tarot

  - perhaps people who are interested in astrology tend to gravitate towards is



- Why does your audience want to use your application? Please provide some sort of reasoning.
  - a simple task for people to do everyday. (like wordle, a little game to play)
  - Gives everyone a way to engage with tarot with other people even if they don't have a deck or are in person with someone else.
  - fun game to play.
  - easy way to log tarot readings and call back to past readings in the future



- Why do you as developers want to build this application?
  - it's a fun way to engage with people
  - it's easy to start with a minimum viable project and a
  - it will create a tarot api for others to use


P0 - a user can have an account
P0 - a user can request a tarot card a day and receive information about the card and how it might tie into their day
P0 - a user can look at past cards they've drawn 

P1 - a user can log a journal entry with the card
P1 - a user can look at their past journal entries

P2 - a user can share their card with others

P3 - a user can request a past-present-future tarot layout and log it with a diary entry ?
P3 - a user can look at all of their past readings including the multi-card ones. ? 

P4 - People can collaborate with others to make their own set of tarot cards

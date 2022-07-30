This project is a fork of **[Binyoon99 : Korean - English Vocabulary](https://github.com/binyoon99/DictionaryWebsite)** and rebuild with **NextJs** and **MongoDB** an a mix of  **TailwindCSS** and **NextUI** for the **UI**.

### ***ALL THE RIGHTS BELONG TO AND ONLY TO [github.com/binyoon99](github.com/binyoon99).***
---

## **Getting Started**
---
### **Install the dependencies**

```bash
npm install
```
---
### **CREATE THE ``.env`` FILE**
This file is for the `MONGODB_URI ` and the `NEXT_PUBLIC_API_WORD_ID`
```bash
.
└── .env
```
Inside the file add the following:
```bash
 #here goes your mongodb atlas URI or local mongodb URI
MONGODB_URI=mongodb://docker:mongopw@localhost:<port> #example if you use docker mongodb.
NEXT_PUBLIC_API_WORD_ID=http://localhost:3005/api/words?id= #variable to fetch the api dont change it.
```
---
### **CREATE A DATABASE AND ADD THE DATA**
Create a database called `dictionary` in MongoDB and create two collections one called `days` and another one called `words` inside the `DATA` folder there are two JSON files `days` and `words` add that data of those files into their respective collection.
```
./DATA/
     ├── days.json
     └── words.json
```
---
### **RUN THE DEVELOPMENT SERVER:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

You can start editing the page by modifying `pages/` files. The page auto-updates as you edit the file.
```bash
.
└── Pages/
    ├── CreateWord.jsx
    ├── DayList.jsx
    ├── MemorizedWords.jsx
    └── [wordsperday].jsx #this is for NextJs dynamic routing
```

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/words](http://localhost:3000/api/words). This endpoint can be edited in `pages/api/words.js`.

```bash
.
└── Pages/
    └── api/
        └── words.js
```

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Change to your own risk the `mongodb.js` this file is where the database connection is made only change it if you know what are you doing.
```bash
.
└── lib/
    └── mongodb.js
```

### **TO-DO:**
- [ ] DELETE a word when Done is set to true

- [ ] Add a day

- [ ] DELETE a day

- [ ] Modify a word

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
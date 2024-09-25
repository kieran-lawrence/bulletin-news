# Bulletin

Hello and welcome to my news website, Bulletin. At the time of writing this I work for a large media organisation and wanted to further my skills and knowledge so decided to make my own news site.

> The name & UI design is thanks to [alvxyz on Dribbble](https://dribbble.com/alvxyz) , please check out his work if you like the style!

## Getting Started

There are a few pre-requisites you will need before starting in order for the project to build successfully:

1. **Yarn:** This project is using yarn, so if you wish to use another package manager you will need to update the scripts in `package.json`
2. **Postgres:** If you wish to use another db type, such as mysql, you will need to update `app.module.ts` in `/apps/bulletin-db
3. Create a `.env` file in `/apps/bulletin-db` and populate it with the following

```
DB_HOST=value_goes_here
DB_PORT=value_goes_here
DB_USERNAME=value_goes_here
DB_PASSWORD=value_goes_here
DB_NAME=value_goes_here
JWT_SECRET=value_goes_here
SALT=value_goes_here
```

4. Create a database with the name you specified in `DB_NAME`
5. Run `yarn` to install all dependencies

## Bootstrapping

Great, now you've done that, you can run the following command from the project root directory

```sh
yarn start:dev
```

To view the frontend, go to `http://localhost:3000`

## Populating the Site

1.  First off, you will need to [create an account](http://localhost:3000/register)
2.  Once registered, open your database and update your role to `administrator`
    > Now you have access to moderate comments and create content for the site!
3.  Now, create a publisher from [this page](http://localhost:3000/admin/publisher)
4.  If this step is here, that means there is currently no way to create an article from the frontend, but it's on my to-do list 😜

    -   Use the below JSON template and with the backend running, send a POST request to `http://localhost:3001/api/article`

        > Notes:
        >
        > -   The `intention` block kind array is optional, so you don't have to include it
        > -   All `articleSections` are used in the example to show what is valid content, but you can use as many or as little as you like

        <details>

        <summary>Example Article</summary>

            ```json
            {
                "publisherId": 1,
                "author": "Billy Bob",
                "title": "Wow, such headline",
                "articleSections": [
                    {
                        "kind": "text",
                        "text": "The article text would go here"
                    },
                    {
                        "kind": "text",
                        "text": "More text, this time with bold, and italics",
                        "intentions": [
                            {
                                "kind": "emphasized",
                                "index": 36,
                                "length": 7
                            },
                            {
                                "kind": "important",
                                "index": 26,
                                "length": 4
                            }
                        ]
                    },
                    {
                        "kind": "heading",
                        "text": "This is a heading!"
                    },
                    {
                        "kind": "quote",
                        "text": "I'm pickle rick!!!!",
                        "attribution": "Rick Sanchez"
                    },
                    {
                        "kind": "image",
                        "url": "an-image-url.webp",
                        "text": "This is a caption",
                        "intentions": [
                            {
                                "kind": "emphasized",
                                "index": 0,
                                "length": 4
                            },
                            {
                                "kind": "important",
                                "index": 10,
                                "length": 7
                            }
                        ]
                    }
                ],
                "category": "Business",
                "readTime": 5,
                "urlToImage": "an-image-url.jpg",
                "publishedAt": "2023-10-01T09:15:59Z",
                "flags": ["must-read"]
            }
            ```

        </details>

## Roadmap

This is a project I work on in my spare time, so updates will be when I get time.
There are a few features I plan to implement which are:

-   **Admin Panel:** A place for moderators, and admins to manage the content on the site, such as creating, updating or deleting articles.
-   **Mobile / Tablet Layouts:** Currently only desktop viewports are supported 😓
-   **Comments Dashboard:** A dashboard for moderators and admins to view comment statistics as well as remove potentially unwanted comments.
-   **Threads:** The ability to reply to other replies in comments, kind of like how Reddit does it. I haven't figured out how I want to do this yet but I really look forward to it.

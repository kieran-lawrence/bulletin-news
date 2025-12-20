# Bulletin

Hello and welcome to my news website, Bulletin. At the time of writing this I work for a large media organisation and wanted to further my skills and knowledge so decided to make my own news site.

> The name & UI design is thanks to [alvxyz on Dribbble](https://dribbble.com/alvxyz) , please check out his work if you like the style!

## Getting Started

There are a few pre-requisites you will need before starting in order for the project to build successfully:

1. **Yarn:** This project is using yarn, so if you wish to use another package manager you will need to update the scripts in `package.json`
2. **Postgres:** If you wish to use another db type, such as mysql, you will need to update `app.module.ts` in `/apps/api
3. Create a `.env` file in `/apps/api` and populate it with the following

```
API_PORT=(optional, default is 3001)
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
yarn dev
```

To view the frontend, go to `http://localhost:3000`

## Populating the Site

1.  First off, you will need to [create an account](http://localhost:3000/register)
2.  Once registered, open your database and update your role to `administrator`
    > Now you have access to moderate comments and create content for the site!
3.  Now, create a publisher from [this page](http://localhost:3000/admin/publisher/create)
4.  Lastly, lets create an article, go to [this page](http://localhost:3000/admin/article/create)

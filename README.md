# Backend

Create a `.env` file with a `DATABASE_URL` variable that points to a PostgreSQL database. Look at `.env.example` for information on how this should be written. This installation is for Windows, commands may be different on other Operating Systems.
Also, for configuring PostgreSQL, additional steps are needed, I created a database called postgres and have username postgres for this project.

Create a Python virtual environment:

```
python -m venv .venv
```

Activate the virtual environment and install the dependencies using `pip`:

```
source ./env/Scripts/activate
pip install -r requirements.txt
```

Run the app:

```
flask run
```

# Frontend

Install the dependencies using `npm`:

```
npm install
```

Run the app:

```
npm start
```


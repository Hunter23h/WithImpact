from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added
import psycopg2 
import os
@receiver(social_account_added)
def on_social_account_added(sender, request, sociallogin, **kwargs):
    if sociallogin.account.provider == 'github':
        user = sociallogin.account.user

        dbname = os.getenv("DB_NAME")
        dbuser = os.getenv("DB_USER")
        dbpass = os.getenv("DB_PASS")
        dbhost = os.getenv("DB_HOST")
        dbport = os.getenv("DB_PORT")

    # Replace these values with your actual database connection details
        connection_params = {
        'dbname': dbname,
        'user': dbuser,
        'password': dbpass,
        'host': dbhost,
        'port': dbport
        }
        # Establish a connection to PostgreSQL
        connection = psycopg2.connect(**connection_params)

        # Create a cursor
        cursor = connection.cursor()

        # Repository does not exist, proceed with insertion
        cursor.execute(
        # f"INSERT into backend_user select username from auth_user where is_staff = false")
            "INSERT INTO backend_user (username) VALUES (%s)", user)

        # Commit changes and close the connection
        connection.commit()
        connection.close()
        # print("Data inserted successfully.")
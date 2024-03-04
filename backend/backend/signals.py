from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added
from allauth.account.signals import user_signed_up
from .models import User

# @receiver(user_signed_up)
# def on_user_sign_up(sender, request, user, **kwargs):
#     # User.objects.create(username=user)
#     print("USED ADDED TO DB")
    
# @receiver(social_account_added)
# def on_social_account_added(sender, request, sociallogin, **kwargs):
#     if sociallogin.account.provider == 'github':
#         # Extract the GitHub username from the social account data
#         github_username = sociallogin.account.extra_data.get('login')

#         # Create a new user with the GitHub username
#         if github_username:
#             User.objects.create(username=github_username)
#             print("User created with GitHub username:", github_username)
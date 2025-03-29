from django.contrib.auth.models import User
from django.contrib.auth import login
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from schema.alchemy_models import EventAlchemy
import datetime


class RegisterUser(APIView):
    """ User Registration """

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already in use'}, status=400)

        try:
            User.objects.create_user(username=username, email=email, password=password)
        except ValidationError as e:
            return Response({'error': str(e)}, status=400)

        return Response({'message': 'User registered successfully'}, status=201)


class LoginView(APIView):
    """ User Login with JWT in Cookies """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # case-insensitive username check
        user = User.objects.filter(username__iexact=username).first()

        if user and user.check_password(password):

            login(request, user)
            refresh = RefreshToken.for_user(user)
            response = Response({
                'message': 'Login successful',
            })

            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=False,
                samesite='Lax'
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite='Lax'
            )

            return response
        else:
            return Response({'error': 'Invalid credentials'}, status=401)


def add_event_to_household(request):
    # TODO: Ask frontend how request JSON will look
    # TODO: Add verification of expected data

    if request.method == "POST":
        event = EventAlchemy(
            id=request["event_id"],
            name=request["event_name"],
            first_date=datetime.date.today(),
            first_time=datetime.datetime.now().time(),
            repeat_every=request["repeat_every"],
            group_id=request["group_id"],
            # TODO: Query for group name, members, and member ids, add to Event
        )

        # TODO: Add Event to Group/Household

        # TODO: Ask what frontend needs on return
        return JsonResponse({"success": True}, status=200)

    return JsonResponse({"success": False}, status=405)


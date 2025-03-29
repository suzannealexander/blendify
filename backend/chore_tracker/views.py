from django.contrib.auth.models import User
from django.contrib.auth import login
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

import datetime
import json
from json import JSONDecodeError
from .models import Event
from backend.chore_tracker.models import Group


class RegisterUser(APIView):
    """User Registration"""

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already in use"}, status=400)

        try:
            User.objects.create_user(username=username, email=email, password=password)
        except ValidationError as e:
            return Response({"error": str(e)}, status=400)

        return Response({"message": "User registered successfully"}, status=201)


class LoginView(APIView):
    """User Login with JWT in Cookies"""

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # case-insensitive username check
        user = User.objects.filter(username__iexact=username).first()

        if user and user.check_password(password):

            login(request, user)
            refresh = RefreshToken.for_user(user)
            response = Response(
                {
                    "message": "Login successful",
                }
            )

            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=False,
                samesite="Lax",
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite="Lax",
            )

            return response
        else:
            return Response({"error": "Invalid credentials"}, status=401)


def create_event(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # We have to check if the group exists before trying to create the event
            try:
                group = Group.objects.get(id=data.get("groupId"))
            except Group.DoesNotExist:
                return JsonResponse(
                    {"success": False, "message": "No such Group"}, status=400
                )

            event = Event.objects.create(
                # ID should be created automatically
                name=data.get("name"),
                # TODO: Determine date format
                first_date=datetime.strptime(
                    data.get("date"), "%Y-%m-%d %H:%M:%S"
                ).date(),
                first_time=datetime.strptime(
                    data.get("date"), "%Y-%m-%d %H:%M:%S"
                ).time(),
                # TODO: Add this in, for now its not in interface in schema.ts
                repeat_every="",
                group=group,
            )

            # Get assigned members and add them. This is required due to the ManyToManyField
            members = User.objects.filter(id__in=data.get("memberIds", []))
            event.members.set(members)

            return JsonResponse({"success": True, "message": ""}, status=200)

        except JSONDecodeError:
            return JsonResponse(
                {"success": False, "message": "Invalid JSON in request"}, status=400
            )

    return JsonResponse(
        {"success": False, "message": "Expected POST method"}, status=405
    )


class CreateGroup(APIView):
    """ Create a Group """

    def post(self, request):
        name = request.data.get('name')
        status = request.data.get('status')
        expiration = request.data.get('expiration')
        timezone = request.data.get('timezone')
        creator = request.user

        try:
            group = Group.objects.create(
                name=name,
                status=status,
                expiration=expiration,
                timezone=timezone,
                creator=creator
            )

            group.members.add(creator)
            return Response({'message': 'Group created successfully'}, status=201)
        except ValidationError as e:
            return Response({'error': str(e)}, status=400)
        except Exception as e:
            return Response({'error': 'Failed to create group: ' + str(e)}, status=500)

from django.urls import path
from .views import RegisterUser, LoginView, CreateGroup, create_event

urlpatterns = [
    path("register/", RegisterUser.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("group/create/", CreateGroup.as_view(), name="create_group"),
    path(
        "/event/create",
        create_event,
        name="create_event",
    ),
]

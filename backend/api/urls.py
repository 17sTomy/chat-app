from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),

    # Chat/Text Messaging Functionality
    path("get-messages/<user_id>/", views.GetMessagesListAPIView.as_view()),
    path("send-message/", views.SendMessageCreateAPIView.as_view()),
    path("read-messages/<sender_id>/<receiver_id>/", views.ReadMessagesUpdateAPIView.as_view()),

    path("profile/<int:pk>/", views.ProfileDetail.as_view()),
    path("search/<username>/", views.SearchUser.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
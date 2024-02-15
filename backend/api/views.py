from itertools import chain

from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import permission_classes

from api.models import User, Profile, ChatMessage
from api.serializers import MyTokenObtainPairSerializer, RegisterSerializer, MessageSerializer, ProfileSerializer, UserSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    

class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(User, id=user_id)

        message_partners = User.objects.filter(Q(sender__receiver=user) | Q(receiver__sender=user)).distinct()

        chats = []

        for partner in message_partners:
            messages = ChatMessage.objects.filter(
                Q(sender=user, receiver=partner) | Q(sender=partner, receiver=user)
            ).order_by('date')
            chats.append(messages)
            
        chats = chain(*chats)
        
        return chats
    
    def get(self, request, *args, **kwargs):
        # user = request.user
        # print(user)
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        receiver_id = self.kwargs['receiver_id']

        messages = ChatMessage.objects.filter(
            sender__in=[sender_id, receiver_id],
            receiver__in=[sender_id, receiver_id]
        )

        return messages
    

class SendMessages(generics.CreateAPIView):
    serializer_class = MessageSerializer


class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    # permission_classes = [IsAuthenticated]


class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Profile.objects.filter(
            Q(user__username__icontains=username) |
            Q(full_name__icontains=username) |
            Q(user__email__icontains=username)
        )

        if not users.exists():
            return Response(
                {'detail': 'Users not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

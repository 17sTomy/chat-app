from itertools import chain
from django.db.models import Q
from rest_framework import status
from rest_framework import generics
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from api.models import User, Profile, ChatMessage
from api.serializers import MyTokenObtainPairSerializer, RegisterSerializer, MessageSerializer, ProfileSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save()
            return Response({"detail": "Registration successful"}, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response({"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": f"An error ocurred: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class GetMessagesListAPIView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        message_partners = User.objects.filter(Q(sender__receiver=user) | Q(receiver__sender=user)).distinct()
        chats = []

        for partner in message_partners:
            messages = ChatMessage.objects.filter(
                Q(sender=user, receiver=partner) | Q(sender=partner, receiver=user)
            ).order_by('date')
            chats.append(messages)
            
        chats = list(chain(*chats))
        return chats
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class SendMessageCreateAPIView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

class ReadMessagesUpdateAPIView(generics.UpdateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.request.user.id
        receiver_id = self.kwargs['receiver_id']

        return ChatMessage.objects.filter(
            Q(sender=sender_id, receiver=receiver_id) | Q(sender=receiver_id, receiver=sender_id),
            is_read=False
        )
    
    def update(self, request, *args, **kwargs):
        if self.get_queryset():
            self.get_queryset().update(is_read=True)
            return Response({'message': 'Mensajes marcados como leídos'})
        return Response({'message': 'No se encontraron mensajes para marcar como leídos'})


class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
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

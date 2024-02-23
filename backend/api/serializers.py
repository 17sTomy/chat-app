from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.models import User, ChatMessage, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.profile.full_name
        token['image'] = str(user.profile.image)
        token['bio'] = user.profile.bio
        token['verified'] = user.profile.verified

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('email', 'username', 'profile_picture', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        profile_picture = validated_data.pop('profile_picture', None)

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        Profile.objects.create(user=user, image=profile_picture)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'full_name', 'image']


class MessageSerializer(serializers.ModelSerializer):
    sender_profile = ProfileSerializer(read_only=True)
    receiver_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'receiver', 'message', 'date', 'is_read', 'sender_profile', 'receiver_profile']

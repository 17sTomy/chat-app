from django.contrib import admin
from api.models import User, Profile, ChatMessage

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'id']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified', 'image', 'id']

class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read', 'message']
    list_display = ['sender', 'receiver', 'message', 'date', 'is_read']

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)

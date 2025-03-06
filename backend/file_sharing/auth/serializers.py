from rest_framework import serializers
from django.contrib.auth.models import User
class UserManagementSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'confirm_password']
    
    #check to see if both password is same
    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)  # Remove confirm_password
        password = validated_data.pop('password', None)

        #check if username already exist
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({"username": "This username is already taken"})

        # Create user
        user = User.objects.create(**validated_data)

        if password:
            user.set_password(password)
            user.save()
            
        return user

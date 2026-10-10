from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import TelegramUser, BankCard, Expense, SavingsGoal, Job, ContactMessage, MessageReply
from .serializers import (
    TelegramUserSerializer, BankCardSerializer, ExpenseSerializer, 
    SavingsGoalSerializer, JobSerializer, ContactMessageSerializer, MessageReplySerializer
)

class TelegramUserViewSet(viewsets.ModelViewSet):
    queryset = TelegramUser.objects.all()
    serializer_class = TelegramUserSerializer

class BankCardViewSet(viewsets.ModelViewSet):
    queryset = BankCard.objects.all()
    serializer_class = BankCardSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().order_by('-id')
    serializer_class = ExpenseSerializer

class SavingsGoalViewSet(viewsets.ModelViewSet):
    queryset = SavingsGoal.objects.all()
    serializer_class = SavingsGoalSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-id')
    serializer_class = JobSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-id')
    serializer_class = ContactMessageSerializer
@api_view(["POST"])
def register(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    if not username or not password:
        return Response(
            {"error": "Username va password kiritilishi shart"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Bu username band"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if len(password) < 8:
        return Response(
            {"error": "Parol kamida 8 ta belgidan iborat bo‘lsin"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        password=password,
    )

    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        {
            "message": "Ro‘yxatdan o‘tish muvaffaqiyatli",
            "username": user.username,
            "token": token.key,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def login(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Username yoki parol noto‘g‘ri"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        {
            "message": "Tizimga muvaffaqiyatli kirdingiz",
            "username": user.username,
            "token": token.key,
        },
        status=status.HTTP_200_OK,
    )
@api_view(['POST'])
def add_reply(request, msg_id):
    try:
        msg = ContactMessage.objects.get(id=msg_id)
        reply_text = request.data.get('text')
        reply = MessageReply.objects.create(message=msg, text=reply_text)
        return Response({'status': 'success', 'reply': MessageReplySerializer(reply).data})
    except ContactMessage.DoesNotExist:
        return Response({'status': 'error', 'message': 'Message not found'}, status=404)
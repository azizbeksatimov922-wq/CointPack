import re
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import BankCard, Expense, SavingsGoal, Job
from .serializers import BankCardSerializer, ExpenseSerializer, SavingsGoalSerializer, JobSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '')
    if not username or not password:
        return Response({'error': 'Telefon raqam va parol majburiy'}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Bu telefon raqam ro\'yxatdan o\'tgan'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(
        username=username,
        password=password,
        first_name=request.data.get('first_name', '').strip(),
        email=request.data.get('email', '').strip(),
    )
    return Response({'message': 'Hisob yaratildi'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    user = authenticate(
        request,
        username=request.data.get('username', '').strip(),
        password=request.data.get('password', ''),
    )
    if user is None:
        return Response({'error': 'Telefon raqam yoki parol noto\'g\'ri'}, status=status.HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'name': user.first_name or user.username})

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_from_voice(self, request):
        """Ovozli matndan summani ajratib oladi: '10 mingga fanta oldim' -> 10000 so'm xarajat"""
        voice_text = request.data.get('text', '')
        
        numbers = re.findall(r'\d+', voice_text.replace(' ', ''))
        amount = int(numbers[0]) if numbers else 0

        if 'ming' in voice_text.lower() and amount < 1000:
            amount *= 1000

        if amount > 0:
            expense = Expense.objects.create(
                user=request.user,
                category='Oziq-ovqat' if any(word in voice_text.lower() for word in ['fanta', 'cola', 'non', 'osh', 'bozor']) else 'Boshqa',
                amount=amount,
                note=voice_text,
                is_voice=True
            )
            return Response({'status': 'Xarajat qoʻshildi', 'amount': amount, 'note': voice_text}, status=status.HTTP_201_CREATED)
        
        return Response({'error': 'Summa aniqlanmadi'}, status=status.HTTP_400_BAD_REQUEST)

class SavingsViewSet(viewsets.ModelViewSet):
    serializer_class = SavingsGoalSerializer

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)
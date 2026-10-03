from datetime import datetime, timedelta
from .models import SavingsGoal

def process_60min_penalty():
    """Belgilangan vaqtdan 60 daqiqa o'tgach kartadan avtomatik pul yechish"""
    now = datetime.now()

    goals = SavingsGoal.objects.filter(penalty_enabled=True)

    for goal in goals:
        scheduled_datetime = datetime.combine(now.date(), goal.scheduled_time)
        deadline = scheduled_datetime + timedelta(minutes=60)

        if now > deadline and goal.card:
            if goal.card.balance >= goal.daily_amount:
                goal.card.balance -= goal.daily_amount
                goal.current_amount += goal.daily_amount
                
                goal.card.save()
                goal.save()
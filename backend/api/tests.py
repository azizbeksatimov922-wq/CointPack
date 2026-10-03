from django.test import TestCase
from rest_framework.test import APIClient


class AuthenticationFlowTests(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_register_then_login_returns_token_and_name(self):
		register_response = self.client.post('/api/register/', {
			'username': '+998901234567',
			'first_name': 'Ali Valiyev',
			'email': 'ali@example.com',
			'password': 'StrongPassword123!',
		}, format='json')

		self.assertEqual(register_response.status_code, 201)
		login_response = self.client.post('/api/login/', {
			'username': '+998901234567',
			'password': 'StrongPassword123!',
		}, format='json')

		self.assertEqual(login_response.status_code, 200)
		self.assertTrue(login_response.data['token'])
		self.assertEqual(login_response.data['name'], 'Ali Valiyev')

	def test_duplicate_registration_is_rejected(self):
		data = {'username': '+998901234567', 'password': 'StrongPassword123!'}
		self.client.post('/api/register/', data, format='json')

		response = self.client.post('/api/register/', data, format='json')

		self.assertEqual(response.status_code, 400)

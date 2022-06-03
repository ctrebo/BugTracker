from django.test import TestCase
from bugTracker.models import Project, Issue, CustomUser
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import get_user_model

user_model = get_user_model()

class CustomUserModelTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.user = user_model.objects.create(username="chris", job="Developper", bio="Hello World") 

    def test_bio_max_length(self):
        self.assertEqual(self.user._meta.get_field("bio").max_length, 100)

    def test_job_max_length(self):
        self.assertEqual(self.user._meta.get_field("job").max_length, 15)
    
    def test_user_string(self):
        self.assertEqual(str(self.user), self.user.username)

    def test_default_image(self):
        self.assertEqual(self.user._meta.get_field("prof_pic").default, "default_pp.jpg")

    # Write test when defining url configs

    #def test_get_absolute_url(self):
    #   self.assertEqual(self.user.get_absolute_url(), "")

class ProjectModelTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.user = user_model.objects.create(username="chris", job="Developper", bio="Hello World") 
        self.project = Project.objects.create(name="Marketing", field="MKTG", creator=self.user)

    def test_name_max_length(self):
        max_length = self.project._meta.get_field("name").max_length
        self.assertEqual(max_length, 20)

    def test_field_max_length(self):
        max_length = self.project._meta.get_field("field").max_length
        self.assertEqual(max_length, 10)

    def test_picture_default_image(self):
        default_image = self.project._meta.get_field("picture").default
        self.assertEqual(default_image, "defaul_project_picture.png")

    def test_str(self):
        self.assertEqual(str(self.project), self.project.name)

    #def test_get_absolute_url(self):
        #pass

class IssueModelTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.user = user_model.objects.create(username="chris", job="Developper", bio="Hello World") 
        self.user2 = user_model.objects.create(username="chris2", job="Developper", bio="Hello there")
        self.project = Project.objects.create(name="Marketing", field="MKTG", creator=self.user)
        self.issue = Issue.objects.create(name="Center div on dashboard", project=self.project, creator=self.user, assigned_to=self.user2, status="o", priority="h", issue_type="b")

    def test_name_max_length(self):
        max_length = self.issue._meta.get_field("name").max_length
        self.assertEqual(max_length, 50)
        
    def test_description_max_length(self):
        max_length = self.issue._meta.get_field("description").max_length
        self.assertEqual(max_length, 500)

    def test_status_max_length(self):
        max_length = self.issue._meta.get_field("status").max_length
        self.assertEqual(max_length, 1)

    def test_priority_max_length(self):
        max_length = self.issue._meta.get_field("priority").max_length
        self.assertEqual(max_length, 1)

    def test_status_max_length(self):
        max_length = self.issue._meta.get_field("issue_type").max_length
        self.assertEqual(max_length, 1)

    def test_str(self):
        self.assertEqual(str(self.issue), self.issue.name)

    #def test_get_absolute_url(self):
        #pass

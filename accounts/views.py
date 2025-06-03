from django.shortcuts import render, redirect
from django.contrib.auth.models import auth
from django.contrib.auth.models import User

# Create your views here.
def login_page(request):
    return render(request, 'accounts/login.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('main:mainpage')
        else:
            return render(request, 'accounts/login.html', {'error': '아이디나 비밀번호가 틀렸습니다. 다시 입력해주세요.'})
    else:
        return render(request, 'accounts/login.html', {'error': '로그인 실패'}
                      )
    

def logout(request):
    auth.logout(request)
    return redirect('main:mainpage')

def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']

        # username 미입력시 에러
        if not username:
            return render(request, 'accounts/signup.html', {'error': '닉네임을 입력해주세요.'})
        
        # 비밀번호에 영문 대소문자, 숫자, 특수문자 (@ ! ? - _)가 각각 1개 이상 포함되어야 하며 8자 이상이어야 함
        if not (any(c.isupper() for c in password) and any(c.islower() for c in password) and any(c.isdigit() for c in password) and any(c in '@!?-_' for c in password) and len(password) >= 8):
            return render(request, 'accounts/signup.html', {'error': '비밀번호가 조건에 맞지 않습니다. 다시 입력해주세요.'})

        if password == password2:
            if User.objects.filter(username=username).exists():
                return render(request, 'accounts/signup.html', {'error': '이미 사용중인 닉네임입니다.'})
            else:
                user = User.objects.create_user(username=username, password=password)
                auth.login(request, user)
                return redirect('main:mainpage')
        else:
            return render(request, 'accounts/signup.html', {'error': '비밀번호가 일치하지 않습니다.'})
    else:
        return render(request, 'accounts/signup.html')
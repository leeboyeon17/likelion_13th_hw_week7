from django.shortcuts import render, redirect
from .models import Product, ProductComment

# Create your views here.
# 메인페이지와 메인페이지의 products 정보들을 불러오는 함수
def mainpage(request):
    products = Product.objects.all()[:3]
    return render(request, 'main/mainpage.html', {'products': products})

# 상품의 상세페이지를 불러오는 함수
def product_detail(request, product_id):
    product = Product.objects.get(id=product_id)
    comments = product.productcomment_set.all()
    return render(request, 'main/product_detail_page.html', {'product': product, 'comments': comments})

# 상품의 상세페이지에서 댓글을 작성하는 함수
def create_comment(request, product_id):
    product = Product.objects.get(id=product_id)
    if request.method == 'POST':
        star = request.POST['star']
        content = request.POST['content']
        product.productcomment_set.create(star=star, content=content, user_id=request.user.id)
    return redirect('main:product_detail', product_id)

# 상품의 상세페이지에서 댓글을 삭제하는 함수 (단, 댓글 작성자만 삭제 가능)
def delete_comment(request, comment_id):
    comment = ProductComment.objects.get(id=comment_id)
    product = comment.product
    if request.user.id != comment.user_id:
        comments = product.productcomment_set.all()
        return render(request, 'main/product_detail_page.html', {'product': product, 'comments': comments, 'error': '본인의 댓글만 삭제할 수 있습니다.'})
    comment.delete()
    return redirect('main:product_detail', product.id)

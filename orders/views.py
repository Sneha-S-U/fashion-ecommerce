from rest_framework import viewsets
from .models import Wishlist, Cart, Order, OrderItem, Payment
from .serializers import WishlistSerializer, CartSerializer, OrderSerializer, OrderItemSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()  
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()  
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()  
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        order.calculate_total()  


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()  
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order__user=self.request.user)

    def perform_create(self, serializer):
        if serializer.validated_data['order'].user == self.request.user:
            serializer.save()
        else:
            raise PermissionDenied("You can't add items to another user's order.")
        
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        return Payment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.validated_data.get('order')

    
        if order.user != self.request.user:
            raise PermissionDenied("You can't pay for another user's order.")

        
        if hasattr(order, 'payment'):
            raise PermissionDenied("This order already has a payment.")

        payment = serializer.save(user=self.request.user, amount_paid=order.total_amount)

    
        order.status = 'confirmed'
        order.save()        

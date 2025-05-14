from rest_framework import serializers
from .models import Wishlist, Cart, Order, OrderItem, Payment

class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_name']


class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    size_name = serializers.ReadOnlyField(source='size.name')

    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_name', 'size', 'size_name', 'quantity']


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    size_name = serializers.ReadOnlyField(source='size.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_name', 'size', 'size_name', 'quantity', 'price_at_time']


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_type', 'total_amount', 'status', 'created_at', 'items']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['user', 'amount_paid', 'payment_date']        
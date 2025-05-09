from rest_framework import serializers
from .models import Category, Product, Size, ProductSize

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'category_name']



class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['size_id', 'size_name']


class ProductSizeSerializer(serializers.ModelSerializer):
    size = SizeSerializer(read_only=True)  # Read-only field for size data
    size_id = serializers.PrimaryKeyRelatedField(
        queryset=Size.objects.all(), write_only=True  # Write-only field for size ID
    )
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True  # Write-only field for product ID
    )

    class Meta:
        model = ProductSize
        fields = ['id', 'product', 'size_id', 'quantity', 'size']

    def create(self, validated_data):
        # Extract `size_id` and `product` from the validated data
        size = validated_data.pop('size_id')
        product = validated_data.pop('product')

        # Create the ProductSize object with the size, product, and other validated data
        product_size = ProductSize.objects.create(size=size, product=product, **validated_data)

        return product_size


class ProductSerializer(serializers.ModelSerializer):
    sizes = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'product_id', 'name', 'description', 'category',
            'price', 'picture', 'is_active', 'created_at',
            'updated_at', 'sizes'
        ]

    def get_sizes(self, obj):
        # Get all product sizes for this specific product
        product_sizes = obj.product_sizes.select_related('size').all()

        # Use the ProductSizeSerializer to serialize the product sizes
        return ProductSizeSerializer(product_sizes, many=True).data

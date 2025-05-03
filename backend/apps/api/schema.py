import graphene
from graphene_django import DjangoObjectType
from core.models.user import User
from vendors.models import Vendor
from products.models import GasProduct
from orders.models import Order, OrderItem

# Types
class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ('password',)

class VendorType(DjangoObjectType):
    class Meta:
        model = Vendor

class GasProductType(DjangoObjectType):
    class Meta:
        model = GasProduct

class OrderType(DjangoObjectType):
    class Meta:
        model = Order

class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem

# Queries
class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    vendors = graphene.List(VendorType)
    vendor = graphene.Field(VendorType, id=graphene.ID())
    products = graphene.List(GasProductType, vendor_id=graphene.ID())
    orders = graphene.List(OrderType, client_id=graphene.ID())
    
    def resolve_users(self, info):
        return User.objects.all()
    
    def resolve_vendors(self, info):
        return Vendor.objects.filter(is_active=True)
    
    def resolve_vendor(self, info, id):
        return Vendor.objects.get(pk=id)
    
    def resolve_products(self, info, vendor_id=None):
        if vendor_id:
            return GasProduct.objects.filter(vendor_id=vendor_id)
        return GasProduct.objects.all()
    
    def resolve_orders(self, info, client_id=None):
        if client_id:
            return Order.objects.filter(client_id=client_id)
        return Order.objects.all()

# Mutations
class CreateOrder(graphene.Mutation):
    class Arguments:
        client_id = graphene.ID(required=True)
        vendor_id = graphene.ID(required=True)
        delivery_address = graphene.String(required=True)
        items = graphene.List(graphene.JSONString, required=True)
    
    order = graphene.Field(OrderType)
    
    def mutate(self, info, client_id, vendor_id, delivery_address, items):
        client = User.objects.get(pk=client_id)
        vendor = Vendor.objects.get(pk=vendor_id)
        
        total_price = 0
        for item in items:
            product = GasProduct.objects.get(pk=item['product_id'])
            total_price += product.price * item['quantity']
        
        order = Order.objects.create(
            client=client,
            vendor=vendor,
            delivery_address=delivery_address,
            total_price=total_price
        )
        
        for item in items:
            product = GasProduct.objects.get(pk=item['product_id'])
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=product.price
            )
        
        return CreateOrder(order=order)

class Mutation(graphene.ObjectType):
    create_order = CreateOrder.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
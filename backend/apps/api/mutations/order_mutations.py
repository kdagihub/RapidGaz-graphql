import graphene
from graphene_django import DjangoObjectType
from orders.models import Order, OrderItem
from core.models.user import User
from vendors.models import Vendor
from products.models import GasProduct
from orders.tasks import send_order_confirmation_email

class CreateOrderMutation(graphene.Mutation):
    class Arguments:
        client_id = graphene.ID(required=True)
        vendor_id = graphene.ID(required=True)
        delivery_address = graphene.String(required=True)
        items = graphene.List(graphene.JSONString, required=True)
    
    order = graphene.Field(lambda: OrderType)
    
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
        
        # Lancer la tâche Celery pour envoyer l'email de confirmation
        send_order_confirmation_email.delay(order.id)
        
        return CreateOrderMutation(order=order)

class OrderType(DjangoObjectType):
    class Meta:
        model = Order
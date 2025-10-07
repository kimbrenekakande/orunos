from ninja import NinjaAPI, ModelSchema, Schema
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI






api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)


@api.get("/hello",)
def hello(request):
    print(request)
    
    return('Motherfucker')  

class UserSchema(Schema):
        username : str
        is_authenticated : bool
        email : str  = None

@api.get("/me", response = UserSchema , auth = JWTAuth())
def me(request):
    print(request)
    return request.user
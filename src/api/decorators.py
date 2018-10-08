from api.helpers import validate_schema


def validate(schema):
    def decor(func):
        def wrapper(self, req, resp, *args, **kwargs):
            validate_schema(req.context['body'], schema)
            return func(self, req, resp, *args, **kwargs)
        return wrapper
    return decor

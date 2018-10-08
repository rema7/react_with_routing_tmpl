import falcon
import jsonschema


def validate_schema(json, schema):
    try:
        jsonschema.validate(json, schema)
    except jsonschema.ValidationError as e:
        raise falcon.HTTPBadRequest(
            'Failed data validation',
            e.message
        )

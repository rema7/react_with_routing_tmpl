central_api_credentials_post_schema = {
    '$schema': 'http://json-schema.org/draft-04/schema',
    'type': 'object',
    'additionalProperties': False,
    'properties': {
        'login': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        },
    },
    'required': [
        'login',
        'password',
    ]
}
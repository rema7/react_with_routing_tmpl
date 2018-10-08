import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
LOG_DIR = os.path.join(PROJECT_ROOT, 'logs')
LOG_LEVEL = 'ERROR'

MIELOFON_CONFIG = PROJECT_ROOT+'/qa/config.toml'

LOG_LEVEL = 'DEBUG'

try:
    from settings_local import *
except ModuleNotFoundError:
    pass

# FRONTEND URL SECTION
FURL_MIELOFON_ACCOUNT = '/api/mielofon/account'
FURL_SPOTIFY_ACCOUNT = '/api/spotify/account'
FURL_FIRMWARE = '/api/firmware'

# BACKEND SECTION
SETTINGS_ROUTE = '/settings'

MIELOFON_ACCOUNT_ROUTE = '/mielofon/account'
SPOTIFY_ACCOUNT_ROUTE = '/spotify/account'
FIRMWARE_ROUTE = '/firmware'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'root': {
        'level': LOG_LEVEL,
        'handlers': ['debug_file'],
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s',
        },
    },
    'handlers': {
        'stream': {
            'level': LOG_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'debug_file': {
            'level': LOG_LEVEL,
            'class': 'logging.FileHandler',
            'formatter': 'verbose',
            'filename': os.path.join(LOG_DIR, 'debug.logs'),
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'formatter': 'verbose',
            'filename': os.path.join(LOG_DIR, 'error.logs'),
        },
        'access_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'access.logs'),
        }
    },
    'loggers': {
        'worker': {
            'level': LOG_LEVEL,
            'handlers': ['stream'],
        },
        'rema-rest': {
            'level': LOG_LEVEL,
            'handlers': ['error_file', 'debug_file'],
            'propagate': False,
        },
        'gunicorn.error': {
            'level': 'INFO',
            'handlers': ['error_file'],
            'propagate': True,
        },
        'gunicorn.access': {
            'level': 'INFO',
            'handlers': ['access_file'],
            'propagate': False,
        },
    },
}

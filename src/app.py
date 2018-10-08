import falcon
from falcon_multipart.middleware import MultipartMiddleware

import settings as app_settings

from api.resources import (
    SettingsResource,
    MielofonAccountResource,
    SpotifyAccountResource,
    FirmwareResource
)

from api.serializer import error_serializer

from middlewares import ContentEncodingMiddleware


app = falcon.API(middleware=[
    MultipartMiddleware(),
    ContentEncodingMiddleware(),
])

app.add_route(app_settings.FIRMWARE_ROUTE, FirmwareResource())
app.add_route(app_settings.MIELOFON_ACCOUNT_ROUTE, MielofonAccountResource())
app.add_route(app_settings.SETTINGS_ROUTE, SettingsResource())
app.add_route(app_settings.SPOTIFY_ACCOUNT_ROUTE, SpotifyAccountResource())

app.set_error_serializer(error_serializer)

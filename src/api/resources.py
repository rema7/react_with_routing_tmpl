import tarfile
from subprocess import call

import falcon
import toml

import settings as app_settings
from api.decorators import validate
from api.logic import validate_auth
from api.schemas import central_api_credentials_post_schema


class SettingsResource:
    @staticmethod
    def on_get(_, resp):
        frontend_urls_prefix = 'FURL_'
        business_logic_keys = (
        )
        resp.body = {
            key: getattr(app_settings, key.upper()) for key in business_logic_keys
        }
        resp.body.update({
            'urls': {
                key[len(frontend_urls_prefix):].lower(): getattr(app_settings, key.upper())
                for key in dir(app_settings) if key.startswith(frontend_urls_prefix)
            }
        })


def parse_toml_config(config):
    try:
        with open(config, 'r', encoding='utf-8') as fp:
            return toml.load(fp)
    except FileNotFoundError:
        raise falcon.HTTPInternalServerError('Config file not found.')


@falcon.before(validate_auth)
class MielofonAccountResource:
    @staticmethod
    def handle_post(login, password):
        params = parse_toml_config(app_settings.MIELOFON_CONFIG)

        mielofon_api = params['api']

        mielofon_api['User'] = login
        mielofon_api['Password'] = password

        serial = toml.dumps(params).rstrip()

        with open(app_settings.MIELOFON_CONFIG, 'w', encoding='utf-8') as fp:
            fp.write(serial)

        return {
            'result': 'ok',
        }

    @validate(central_api_credentials_post_schema)
    def on_post(self, req, resp):
        body = req.context['body']

        resp.body = self.handle_post(
            login=body['login'],
            password=body['password'],
        )

    @staticmethod
    def get_body():
        params = parse_toml_config(app_settings.MIELOFON_CONFIG)
        mielofon_api = params['api']

        return {
            'login': mielofon_api['User'],
            'password': mielofon_api['Password'],
        }

    def on_get(self, req, resp):
        resp.body = self.get_body()


@falcon.before(validate_auth)
class SpotifyAccountResource:
    @staticmethod
    def handle_post(login, password):
        return {
            'result': 'ok',
        }

    @validate(central_api_credentials_post_schema)
    def on_post(self, req, resp):
        body = req.context['body']

        resp.body = self.handle_post(
            login=body['login'],
            password=body['password'],
        )

    @staticmethod
    def get_body(uid):
        return {
            'login': '',
            'password': ''
        }

    def on_get(self, req, resp):
        resp.body = self.get_body(req.context['uid'])


@falcon.before(validate_auth)
class FirmwareResource:
    @staticmethod
    def handle_post(filename, file):
        fname = '/tmp/'+filename

        with open(fname, 'wb') as output_file:
            output_file.write(file.file.read())

        try:
            tar = tarfile.open(fname, "r:gz")
            tar.extractall('/tmp')
            tar.close()

            call(["/tmp/deploy.sh"])

            return {
                'filename': filename,
            }
        except tarfile.ReadError:
            raise falcon.HTTPBadRequest(description='not a gzip file')

    def on_post(self, req, resp):
        filename = req.get_param('name')
        file = req.get_param('file')

        resp.body = self.handle_post(
            filename=filename,
            file=file,
        )

    @staticmethod
    def get_body():
        return {
            'login': '',
            'password': ''
        }

    def on_get(self, req, resp):
        resp.body = self.get_body()


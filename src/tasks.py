import os
from logging.config import dictConfig

from invoke import Collection, task

import settings as app_settings

LOCAL_SETTINGS = 'settings_local.py'


@task
def init_config(ctx, config_file, silent=False):
    settings_local = '''
LOG_LEVEL = 'DEBUG'
MIELOFON_CONFIG = '{config_file}'
'''.format(config_file=config_file)

    settings_local_path = os.path.join(
        app_settings.PROJECT_ROOT, LOCAL_SETTINGS)
    if os.path.isfile(settings_local_path):
        if silent:
            exit(0)

        print('{} already exists'.format(LOCAL_SETTINGS))
        exit(1)

    with open(settings_local_path, 'w') as settings_file:
        settings_file.write(settings_local)


dictConfig(app_settings.LOGGING)

ns = Collection()
ns.add_task(init_config)

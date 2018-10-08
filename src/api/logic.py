import falcon


def validate_auth(req, resp, resource, params, db_session=None):
    # login = req.context.get('login', None)
    # password = req.context.get('password', None)
    #
    # if not login or not password:
    #     raise falcon.HTTPUnauthorized(
    #         title='Not authorized',
    #         description=None
    #     )
    #
    # token = db_session.query(UserToken).filter(
    #     UserToken.token == token
    # ).first()
    # if token is None:
    #     raise falcon.HTTPUnauthorized(
    #         title='Not authorized',
    #         description=None
    #     )
    # req.context['uid'] = token.user_id
    # user = db_session.query(User).filter(User.id == token.user_id).first()
    # req.context['user'] = user
    pass

from flask import Blueprint,request,jsonify

from app import app,db
user_pb=Blueprint('user_pb',__name__)
from models import users

@user_pb.post('/signup')
def signup():
    data=request.json 
    app.logger.info('into signup')
    try:
        exists=bool(users.query.filter_by(name=data['name']).all())
        if exists==False:
            us=users(name=data['name'],email=data['email'],password=data['password'])
            db.session.add(us)
            db.session.commit()
            return {'message':'user added successfully'},200
        else:
            return {'message': 'Email already there'}
    except Exception as e:
        return {'message':str(e)},400

@user_pb.post('/login')
def login():
    data=request.json
    try:
        u=users.query.filter_by(name=data['email'],password=data['password']).all()
        exists=bool(u)
        if exists==True:
            data=jsonify([x.to_json() for x in u])
            return data.json,200
        else :
            return [],300
    except Exception as e:
        return [],400
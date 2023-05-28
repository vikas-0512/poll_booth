from flask import Blueprint,jsonify,request
from models import *
from app import app,db

team_rt=Blueprint('team_rt',__name__)

@team_rt.get('/<user_id>')
def Get_teams(user_id):
    try:
        data=users.query.filter_by(id=user_id).first()
        if data is None :
            return [],400
        data=data.teams
        data=jsonify([x.to_json() for x in data])
        return data.json,200
    except Exception as e:
        return {'messege': str(e)},400

@team_rt.post('/add')
def Add_team():
    data=request.json
    try:
        u=users.query.filter_by(id=data['userid']).first()
        t=teams(teamname=data['teamname'],creator=data['userid'])
        t.members.append(u)
        db.session.add(t)
        db.session.commit()
        return {'message': 'Team added successfully'},200
    except Exception as e:
        return {'message': str(e)},400
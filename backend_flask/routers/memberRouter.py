from flask import jsonify, Blueprint, request,json,redirect,url_for
member_rt=Blueprint('member_rt',__name__)
from models import *
from app import app,db;

@member_rt.get('/<teamid>')
def Get_Members(teamid):
    try:
        data=teams.query.filter_by(teamid=teamid).first().members
        data=jsonify([x.to_json() for x in data])
        return data.json,200
    except Exception as e:
        return {'message': str(e)},400

@member_rt.post('/add')
def Add_member():
    try:
        data=json.loads(request.args.get("json"))
        if data is None:
            data=request.json
        exists=db.session.query(members).filter_by(user_id=data['userid'],team_id=data['teamid']).all()
        if len(exists)>0 :
            return {'message': 'User Already present'},200
        db.session.execute(members.insert().values(user_id=data['userid'],team_id=data['teamid']))
        db.session.commit()
        return {'message': 'Member Added successfully'},200
    except Exception as e:
        return {'message': str(e)},400

@member_rt.post('/addemail')
def Add_email():
    try:
        data=request.json
        teamid=data['teamid']
        u=users.query.filter_by(email=data['email']).first()
        if u is None:
            return {'message':'No such user exists'},400
        tup={'teamid':teamid,'userid':u.id}
        redirect_url=url_for('member_rt.Add_member',_external=True,json=json.dumps(tup))
        return redirect(redirect_url, code=307)
    except Exception as e:
        return {'message': str(e)},400
        
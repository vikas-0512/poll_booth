from flask import Blueprint,request,jsonify

poll_rt=Blueprint('poll_rt',__name__)

from models import *

@poll_rt.get('all/<teamid>')
def Get_polls(teamid):
    try:
       data=request.json
       p=teams.query.filter_by(teamid=data['teamid']).first().polls
       data=jsonify([x.to_json() for x in data])
       return data.json,200
    except Exception as e:
        return {'message': str(e)},400

@poll_rt.post('/addpoll/<teamid>')
def Add_poll(teamid):
    try:
        data=request.json
        t=teams.query.filter_by(teamid=teamid).first()
        p=polls(pollname=data['pollname'],teamid=teamid)
        t.polls.append(p)
        db.session.add(p)
        db.session.commit()
        return {'message':'Poll added successfully'},200
    except Exception as e:
        return {'message': str(e)},400

@poll_rt.post('addoption/<pollid>')
def Add_option(pollid):
    try:
        data=request.json
        p=polls.query.filter_by(pollid=pollid).first()
        o=options(optionname=data['optionname'],votes=0,pollid=pollid)
        p.options.append(o)
        db.session.add(o)
        db.session.commit()
        return {'message': 'option added successfully'},200
    except Exception as e:
        return {'message': str(e)},400

@poll_rt.get('/getpollDetails/<pollid>')
def Get_poll_details(pollid):
    try:
        data=polls.query.filter_by(pollid=pollid).first.options
        data=jsonify([x.to_json() for x in data])
        return data.json,200
    except Exception as e:
        return {'message': str(e)}

@poll_rt.put('/vote/<optionid>')
def vote(optionid):
    try:
        data=options.query.filter_by(optionid=optionid).first()
        data.votes+=1
        db.session.commit()
        return {'message': 'voted successfully'},200
    except Exception as e:
        return {'message': str(e)},400


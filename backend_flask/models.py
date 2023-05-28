from app import db

members=db.Table('members',
        db.Column('user_id',db.Integer,db.ForeignKey('users.id')),
        db.Column('team_id',db.Integer,db.ForeignKey('teams.teamid')),
        db.UniqueConstraint('team_id', 'user_id', name='uix_1')
        )

class users(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(20),nullable=False)
    email=db.Column(db.String(20),unique=True, nullable=False)
    password=db.Column(db.String(20),nullable=False)
    teams=db.relationship('teams',secondary=members,backref='members',lazy=False)
    def to_json(self):
        return {
            'id':self.id,
            'name':self.name,
            'email':self.email,
        }

class teams(db.Model):
    teamid=db.Column(db.Integer,primary_key=True)
    teamname=db.Column(db.String(20),nullable=False)
    creator=db.Column(db.Integer,db.ForeignKey('users.id',ondelete='CASCADE'),nullable=False)
    polls=db.relationship('polls',backref='team')
    def to_json(self):
        return {
            'teamname':self.teamname,
            'creator':self.creator,
            'teamid':self.teamid
        }

class polls(db.Model):
    pollid=db.Column(db.Integer,primary_key=True)
    pollname=db.Column(db.String(20),nullable=False)
    teamid=db.Column(db.Integer,db.ForeignKey('teams.teamid'),nullable=False)
    options=db.relationship('Options',backref='poll')
    def to_json(self):
        return {
            "pollid":self.pollid,
            'pollname':self.pollname,
            'teamid':self.teamid,
        }
 
class Options(db.Model):
    optionid=db.Column(db.Integer,primary_key=True)
    optionname=db.Column(db.String(20))
    votes=db.Column(db.Integer,default=0,nullable=False)
    pollid=db.Column(db.Integer,db.ForeignKey('polls.pollid'))
    def to_json(self):
        return{
            'optionid':self.optionid,
            'optionname':self.optionname,
            'votes':self.votes,
            'pollid':self.pollid
        }
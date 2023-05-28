from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

app.logger.info("hello vikas")

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://velma:Prabhas#123@localhost:3306/amma'
db=SQLAlchemy(app)
migrate=Migrate(app,db)

from routers.userRouter import user_pb
from routers.teamRouter import team_rt

app.register_blueprint(team_rt,url_prefix="/teams")
app.register_blueprint(user_pb,url_prefix="/users")

if __name__=='__main__':
    app.run(debug=True)
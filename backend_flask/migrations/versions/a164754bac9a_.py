"""empty message

Revision ID: a164754bac9a
Revises: 9bce0e488e4c
Create Date: 2023-05-22 13:54:45.273545

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a164754bac9a'
down_revision = '9bce0e488e4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('options', schema=None) as batch_op:
        batch_op.alter_column('optionname',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)

    with op.batch_alter_table('polls', schema=None) as batch_op:
        batch_op.alter_column('pollname',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    with op.batch_alter_table('polls', schema=None) as batch_op:
        batch_op.alter_column('pollname',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)

    with op.batch_alter_table('options', schema=None) as batch_op:
        batch_op.alter_column('optionname',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###
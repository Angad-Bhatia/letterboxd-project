from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=2,
        movie_id=1,
        like=True,
        stars=5,
        description="''How's your mother?'' ''She's on her way out.'' ''We all are, act accordingly.'' I always feel like I need to justify my love for The Departed by saying that it is my favourite Scorsese, but not his best. The problem with me saying that is it makes me forget how awesome it actually is. That is why every few months I need to rewatch it to remind myself. Still awesome."
    )

    review2 = Review(
        user_id=3,
        movie_id=1,
        like=True,
        stars=5,
        description="This film needs a comedy genre tag because it may be the funniest movie I've ever seen"
    )

    review3 = Review(
        user_id=2,
        movie_id=2,
        like=True,
        stars=5,
        description="me: i should get some sleep i have a lot to do in the morning my brain: hey remember when eduardo's shares were diluted down to 0.03%?"
    )

    review4 = Review(
        user_id=3,
        movie_id=2,
        like=True,
        stars=5,
        description="''As if every thought that tumbles through your head was so clever it would be a crime for it not to be shared'' - How I feel after scrolling through Twitter for 10 minutes"
    )

    review5 = Review(
        user_id=1,
        movie_id=4,
        like=False,
        stars=3,
        description="the very definition of meta is characters in a film talking about a six-minute tracking shot during an eight-minute tracking shot"
    )

    review6 = Review(
        user_id=3,
        movie_id=4,
        like=True,
        stars=4,
        description="Every single working studio exec should be forced to watch this movie and take notes."
    )

    review7 = Review(
        user_id=0,
        movie_id=0,
        like=None,
        stars=0,
        description=""
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

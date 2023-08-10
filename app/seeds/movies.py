from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text

def seed_movies():
    movie1 = Movie(
        user_id=1,
        title='The Departed',
        art='https://a.ltrbxd.com/resized/sm/upload/jr/th/pu/pb/laefkgrfa3oKwvBtWTBtf2suiI4-0-500-0-750-crop.jpg',
        tagline='LIES. BETRAYAL. SACRIFICE. HOW FAR WILL YOU TAKE IT?',
        summary="To take down South Boston's Irish Mafia, the police send in one of their own to infiltrate the underworld, not realizing the syndicate has done likewise. While an undercover cop curries favor with the mob kingpin, a career criminal rises through the police ranks. But both sides soon discover there's a mole among them.",
        rating='R',
        year=2006,
        genre='Crime',
        director='Martin Scorsese',
        writer='William Monahan',
        cast='Leonardo DiCaprio, Matt Damon, Jack Nicholson, Mark Wahlberg, Vera Farmiga, Ray Winstone, Martin Sheen, Alec Baldwin',
        trailer_url='https://www.youtube.com/watch?v=ggs6Ip97vRU&ab_channel=WarnerBros.'
    )

    movie2 = Movie(
        user_id=1,
        title='The Social Network',
        art='https://a.ltrbxd.com/resized/sm/upload/nw/cm/pa/ai/sGQv3ZMZBDBnl3z42Q0mEQ5uiDe-0-500-0-750-crop.jpg?v=54ee59f7cd',
        tagline="YOU DON'T GET TO 500 MILLION FRIENDS WITHOUT MAKING A FEW ENEMIES.",
        summary="On a fall night in 2003, Harvard undergrad and computer programming genius Mark Zuckerberg sits down at his computer and heatedly begins working on a new idea. In a fury of blogging and programming, what begins in his dorm room as a small site among friends soon becomes a global social network and a revolution in communication. A mere six years and 500 million friends later, Mark Zuckerberg is the youngest billionaire in history… but for this entrepreneur, success leads to both personal and legal complications.",
        rating='PG-13',
        year=2010,
        genre='Drama',
        director='David Fincher',
        writer='Aaron Sorkin',
        cast='Jesse Eisenberg, Andrew Garfield, Justin Timberlake, Rooney Mara',
        trailer_url='https://www.youtube.com/watch?v=rxY9fKgK5OQ&ab_channel=YouTubeMovies'
    )

    movie3 = Movie(
        user_id=2,
        title='Mother',
        art='https://a.ltrbxd.com/resized/sm/upload/d9/ak/bf/ux/mHdlmzflukTX2a2w6rwOkCix34v-0-500-0-750-crop.jpg',
        tagline="SHE'LL STOP AT NOTHING",
        summary="A mother lives quietly with her son. One day, a girl is brutally killed, and the boy is charged with the murder. Now, it's his mother's mission to prove him innocent.",
        rating='R',
        year=2009,
        genre='Mystery',
        director='Bong Joon-ho',
        writer='Bong Joon-ho',
        cast='Kim Hye-ja, Won Bin, Jin Goo, Yoon Je-moon, Jeon Mi-seon',
        trailer_url='https://www.youtube.com/watch?v=0oBwQHWeYxo&ab_channel=MagnoliaPictures%26MagnetReleasing'
    )

    movie4 = Movie(
        user_id=2,
        title='The Player',
        art='https://a.ltrbxd.com/resized/film-poster/4/6/2/6/3/46263-the-player-0-500-0-750-crop.jpg',
        tagline="EVERYTHING YOU'VE HEARD IS TRUE!",
        summary="A Hollywood studio executive is being sent death threats by a writer whose script he rejected - but which one?",
        rating='R',
        year=1992,
        genre='Mystery',
        director='Robert Altman',
        writer='Michael Tolkin',
        cast='Tim Robbins, Greta Scacchi, Fred Ward, Whoopi Goldberg, Peter Gallagher',
        trailer_url='https://www.youtube.com/watch?v=HpDDTS08wPs&ab_channel=RottenTomatoesClassicTrailers'
    )

    movie5 = Movie(
        user_id=3,
        title='Heat',
        art='https://a.ltrbxd.com/resized/film-poster/5/1/9/9/4/51994-heat-0-500-0-750-crop.jpg',
        tagline="A LOS ANGELES CRIME SAGA.",
        summary="Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
        rating='R',
        year=1995,
        genre='Crime',
        director='Michael Mann',
        writer='Michael Mann',
        cast='Robert De Niro, Al Pacino, Val Kilmer, Tom Sizemore, Diane Venora, Amy Brenneman, Ashley Judd, Jon Voight',
        trailer_url='https://www.youtube.com/watch?v=14oNcFxiVaQ&ab_channel=WarnerBros.'
    )

    movie6 = Movie(
        user_id='',
        title='',
        art='',
        tagline="",
        summary="",
        rating='',
        year=0,
        genre='',
        director='',
        writer='',
        cast='',
        trailer_url=''
    )

    db.session.add_all([movie1, movie2, movie3, movie4, movie5])
    db.session.commit()

def undo_movies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()

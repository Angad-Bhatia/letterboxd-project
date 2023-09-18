from app.models import db, List, environment, SCHEMA
from app.seeds.movies import movie1, movie2, movie3, movie4, movie5, movie6, movie7
from sqlalchemy.sql import text

def seed_lists():
    list1 = List(
        user_id=1,
        name="Favorites",
        image="Watchlist",
        description="Watchlist",
        watchlist=False,
        favorites=True
    )

    list2 = List(
        user_id=1,
        name="Watchlist",
        image="Watchlist",
        description="Watchlist",
        watchlist=True,
        favorites=False
    )

    list3 = List(
        user_id=2,
        name="Favorites",
        image="Favorites",
        description="None",
        watchlist=False,
        favorites=True
    )

    list4 = List(
        user_id=2,
        name="Vibes",
        image="https://i0.wp.com/longreads.com/wp-content/uploads/2022/04/gettyimages-1351537298-scaled.jpg",
        description="Just no other way to describe these films.",
        watchlist=False,
        favorites=False
    )

    list5 = List(
        user_id=3,
        name="Favorites",
        image="Favorites",
        description="Favorites",
        watchlist=False,
        favorites=True
    )

    list6 = List(
        user_id=3,
        name="In My Feelings",
        image="https://assets2.sharedplaylists.cdn.crowds.dk/playlists/80/b0/34/sz300x300_in-my-feelings-18-d9061b4ab6.jpeg",
        description="Movies. Please save me",
        watchlist=False,
        favorites=False
    )

    list1.movies.append(movie1)
    list1.movies.append(movie2)
    list2.movies.append(movie3)
    list2.movies.append(movie4)
    list3.movies.append(movie5)
    list3.movies.append(movie6)
    list4.movies.append(movie2)
    list4.movies.append(movie1)
    list5.movies.append(movie6)
    list5.movies.append(movie7)
    list6.movies.append(movie1)
    list6.movies.append(movie6)

    db.session.add_all([list1, list2, list3, list4, list5, list6])
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()

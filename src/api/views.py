from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# connection to make a cursor to run raw sql queries
from django.db import connection

# create global cursor
cursor = connection.cursor()


class HotelSearchView(APIView):
    def post(self, request):

        search_query = request.data.get('search_query')  # Assuming the form field is named 'search_query'

        # perform search logic here
        cursor.execute(
            "SELECT "
                "H.HOTEL_NAME, "
                "H.HOTEL_CITY, "
                "H.HOTEL_STATE, "
                "AVG(R.RATING) AS AVERAGE_RATING, "
                "H.hotel_name LIKE %s AS IS_LIKE_SEARCH_NAME, "
                "H.hotel_city LIKE %s AS IS_LIKE_SEARCH_CITY "
            "FROM "
                "Hotels H "
            "LEFT JOIN "
                "( "
                    "SELECT ROOM_FK, RATING "
                    "FROM Reviews "
                    "WHERE ROOM_FK IN (SELECT ROOM_ID FROM Rooms) "
                ") R ON H.HOTEL_ID = (SELECT HOTEL_FK FROM Rooms WHERE ROOM_ID = R.ROOM_FK) "
            "WHERE "
                "H.hotel_name LIKE %s "
                "OR H.hotel_city LIKE %s "
            "GROUP BY H.HOTEL_ID, H.hotel_name, H.hotel_city, H.hotel_state ",
            ['%' + search_query + '%', '%' + search_query + '%', '%' + search_query + '%', '%' + search_query + '%']
        )

        results = cursor.fetchall()

        query_column_names = ["HOTEL_NAME", "HOTEL_CITY", "HOTEL_STATE", "RATING", "IS_LIKE_SEARCH_NAME", "IS_LIKE_SEARCH_CITY"]

        zipped_results = [dict(zip(query_column_names, row)) for row in results]

        return Response(zipped_results)
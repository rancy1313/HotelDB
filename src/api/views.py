from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# connection to make a cursor to run raw sql queries
from django.db import connection

# create global cursor
cursor = connection.cursor()

class HotelSearchView(APIView):
    def post(self, request):
        print("hello")
        # Handle form data here
        search_query = request.data.get('search_query')  # Assuming the form field is named 'search_query'

        # Perform your search logic here
        print("hello", type(search_query))

        cursor.execute(
            "SELECT "
                "H.hotel_name, "
                "H.hotel_city, "
                "H.hotel_state, "
                "AVG(R.RATING) AS AVERAGE_RATING "
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
            ['%' + search_query + '%', '%' + search_query + '%']
        )


        results = cursor.fetchall()

        query_column_names = ["hotel_name", "hotel_location", "hotel_state", "rating"]

        zipped_results = [dict(zip(query_column_names, row)) for row in results]

        print(zipped_results)
        return Response(zipped_results)
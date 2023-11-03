from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# connection to make a cursor to run raw sql queries
from django.db import connection


# A user can search hotels in the navbar and this class view returns the corresponding hotels based
# on pattern matching of the hotel name and city
class HotelSearchView(APIView):
    def post(self, request):
        # get search text from user
        search_query = request.data.get('search_query')

        # query relevant cols based on hotel name and city. Uses multiple sub queries
        # bc tha rating is calculated from the Reviews table, but we need to know which rooms belong
        # to which hotel to get a rating for each hotel
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT "
                    "H.HOTEL_ID, "
                    "H.HOTEL_NAME, "
                    "H.HOTEL_ADDRESS, "
                    "H.HOTEL_CITY, "
                    "H.HOTEL_STATE, "
                    "H.HOTEL_ZIP, "
                    "H.HOTEL_PHONE_NUMBER, "
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

        # prepare data to return to front end
        query_column_names = ["HOTEL_ID", "HOTEL_NAME", "HOTEL_ADDRESS", "HOTEL_CITY", "HOTEL_STATE", "HOTEL_ZIP",
                              "HOTEL_PHONE_NUMBER", "RATING", "IS_LIKE_SEARCH_NAME", "IS_LIKE_SEARCH_CITY"]
        zipped_results = [dict(zip(query_column_names, row)) for row in results]

        print(zipped_results)

        return Response(zipped_results)


class HotelInfoView(APIView):
    def post(self, request):
        # get id of hotel user is trying to view details of
        search_query = request.data.get('search_query')

        # query relevant cols for that specific hotel by id
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Hotels WHERE HOTEL_ID = %s", [search_query])
            results = cursor.fetchone()

        query_column_names = ["HOTEL_ID", "HOTEL_NAME", "HOTEL_ADDRESS", "HOTEL_CITY", "HOTEL_STATE", "HOTEL_ZIP",
                              "HOTEL_PHONE_NUMBER"]

        # zip the data with relevant col names
        zipped_results = dict(zip(query_column_names, results))

        return Response(zipped_results)

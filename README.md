
# Restaurant Reservations

This is an application that allows a restaurant to manage their reservations.


## Installation

To get this on you local machine, follow these steps to clone the repo:

```bash
  git clone https://github.com/Mculler25/Restaurant-Reservations.git project
  cd project
  npm install
```
    
## Dashboard

![dashboard screen](readMeScreenShot/dashboard.png)

This page will display the reservations for a certain date.If there are no reservations for the day with a booked status, a message saying `there are no booked reservations` today will display. The user can make choose a specific date to show by adding `?date=someDate`. Hitting the previous, today, and next buttons will change the date for what reservations should be displayed. This page will also show the tables. You can see which tables are aviable by the table status that is display.

![reservation](readMeScreenShot/reservation.png)

The reservations on this page will display the last name, first name, then a mobile number, reservation date, reservation time, amount of people, and the status. At the bottom will be a seat button, edit button, and a cancel button.

If you hit the cancel button the reservation status will be change to canceled and then removed from the dashboard.

![reservation at table](readMeScreenShot/reservationAtTable.png)

If you hit the seat button the reservation status will be changed to seated. You will be direct to a seating page with the abilty to choose the table where you would like to seat the reservation. After this you will be redirected back the the dashboard. The reservation will now be displayed at the table. A finish button will be displayed to remove the reservation from the table and the table status will now be free.

![edit page](readMeScreenShot/editReservation.png)

If you hit the edit button you will be redirected to a page where you can edit the existing reservation. If you hit cancel, no changes will be made. If you hit submit you will be redirected to the dashboard with the updated reservation showing.
## Create Reservation Page

![create reservation page](readMeScreenShot/createReservationPage.png)

On this page you can create a new reservation. All fields are require to make a new reservation. If you wish to not make a reservation, hit cancel and will return you to the dashboard. IF you hit submit, a new reservation will be created, and you will be returned to the dashboard with the new reservation displayed.

![newly created reservation](readMeScreenShot/newReservationDisplayed.png)
## Create New Table

![new table page](readMeScreenShot/newTablePage.png)

On this page, you will be able to create a new table. All fields are required. If you hit cancel, you will be returned to the dashboard, with nothing happening. On submit, you will be returned to the dashboard with the new table being showed.

![new table being showed](readMeScreenShot/newTableShowing.png)
## Search Page

![search page](readMeScreenShot/searchPage.png)

On this page you can search for the reservation matching a full or partial phone number. Just enter in the number you want to seach for and then hit find.

![search page found](readMeScreenShot/foundNumber.png)
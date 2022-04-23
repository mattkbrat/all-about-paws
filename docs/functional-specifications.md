# Functional Specifications

**Functional Specification Document**
--------------------------------------------------------------------------------

| Topic | Details |
|:-------:|:-----:|
| Created for | All About Paws Scheduling App | |
| Risk Level | Low | |
| Test Type | Functional | |
| Test Area | Functional | |
| Description | This document describes the functional specifications for the All About Paws Scheduling App. | |
| Requirements | Please see package.json |

Version History
---------------
| Version | Date | Modified By | Description |
|:-------:|:----:|:----------:|:-----------:|
| 1.0.0 | 2022-04-12 | H. T. | Initial version |
| 1.0.1 | 2020-04-22 | M. B. | General touch-ups |

## Solutions Overview
As the business grows and more customers come in, the need for an online scheduling system becomes necessary for All About Paws Pet Spa LLC. The current system has no online component for scheduling, meaning that a user can only inquire about a scheduled appointment through the phone or in person. With the addition of the All About Paws Scheduling Application, Shop owners/ System Admins will be able to schedule appointments and manage them online. The user will be able to view detailed information about their appointments online. The system will also be able to view a list of all appointments for a given day, week, or month.

## Functional overview (User)
The user Should be able to navigate the site by using the links located in the navbar.

### Home 
The user should be able to click on this link to return to the home page. If the user is already on the home page, the home page should refresh.

### Contact 
The user should be able to click this link and bee directed to the contact page.
- The user should see the phone number of the shop in order to call and schedule an appointment
- The user should see the address of the Shop in order to visit the shop and schedule and appointment

### Login
By clicking on this link, the user should be directed to the sign in page. Here, the user should be directed to enter their email address into the text box provided.
- A button should be located right next to the email text box. Pressing this button should confirm the user’s input and therefore confirm their email entry.  
- After the button has been pressed, a message should pop up confirming that the link has been sent to the provided email address

Once logged in, user should see the addition of the Logout link, which they should use to log out of their account and return to the home screen. 

## Functional overview (Shop owner/System admin)

The Shop Owner/System Admin should be able to create appointments for the user by utilizing the Add Pet and Schedule components of the application. As a result, they should see an additional 2 links that are used for scheduling an appointment.

### Add Pet
By clicking the Add Pet link, the owner/admin should be directed to the Add Pet page. Here, the Shop Owner/System Admin should be able to fill in the appropriate information for registering a pet:

#### Owner

Here, the Shop Owner/System Admin should be given a drop-down selection box where they can choose the owner for the pet being registered.

#### Pet Information

Here, the Shop Owner/System Admin will enter the Pet’s information as given by the user.
- Name – Name of the pet, should be a text entry
- Breed – Breed of the pet, should be a text entry
- Condition – Condition of the pet, should be a text entry
- Special Instructions – Any special instructions to follow when dealing with the pet, should be a text entry
- Picture – Picture of the pet, should be a picture file upload
- Temperament – Temperament of the pet (passive/aggressive/neutral), should be text entry
- Age – Age of the pet, should be type int
- Size – Length of the pet, should be type int
- Weight – Weight of the pet, should be type int

#### Schedule

By clicking on the Schedule link, the Shop Owner/System Admin should be directed to the scheduling page. Here, they should be met with a calendar that shows the availability for scheduling.
i.	Date views

There should be 4 separate date views for the calendar, located in the top right corner of the calendar.
- Today – If the current day is in range, this view should show the current view with the current day highlighted in purple
- Month – This view should show the availability for the month
- Week – This view should show the availability for the week
- Day – this view should show the availability for the day

ii.	Date Range

The user should be able to change the date range by using the arrows that encapsulate the date range, located on the top left corner of the calendar.
- Set to Month, the range should change in monthly increments/ decrements.
- Set to Week, the range should change in weekly increments/ decrements.
- Set to Day, the range should change in daily increments/decrements. 

## Test Plan (user)
| Test | Action | Expected Result |
| ---- | ----- | ------------- |
| 1. | Click on the Add Pet link | The Add Pet page should be displayed |
| 2. | Click on the Schedule link | The Schedule page should be displayed |
| 3. | Click on the Login link | The user should be logged in |
| 4. | Click on the Logout link | The user should be logged out and the home page should be displayed |
| 5. | Click the home link | The user should be redirected to the home page |
| 6. | Click the contact link | The user should be redirected to the contact page |

## Test Plan (Shop owner/System admin)
| Test | Action | Expected Result |
| ---- | ----- | ------------- |
| 1. | Click on the Add Pet link | The Add Pet page should be displayed |
| 2. | Click on the Schedule link | The Schedule page should be displayed |
| 3. | Click on the Login link | The user should be logged in |
| 4. | Click on the Logout link | The user should be logged out and the home page should be displayed |
| 5. | Click the home link | The user should be redirected to the home page |
| 6. | Click the contact link | The user should be redirected to the contact page |

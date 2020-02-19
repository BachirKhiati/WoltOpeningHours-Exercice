## Wolt exercise - React Native
Write a program that takes a Json as input and display the details formatted on a Card.


## Extra Libraries added

* Animation mainly:
 
        "react-native-reanimated"
        
        "react-native-redash"
        
         "react-native-gesture-handler"
        
*  Icons:

        "react-native-vector-icons"
        
*  Language:   

        "react-native-i18n"
    - Note: Original repo is "Deprecated", I'm using my updated branch.
    
    


## Application Details
  
    - Implemented and configured Multi-Language support.
        * English
        * Finnish
        
    - Used 3rd party librarie to handle the animations.
    
    - Implemented Fastlane for build and store delivery.
    
    - Impmlemented Splash screen for both native platform and updated the icons.
    
        * in android, I linked my own native library directly to the project. check it.
        
    - Linked manually only one font that I'm using: "SimpleLineIcons".
    
    - Also, linked manually the 3 Roboto fonts needed.
    
    - Opening hours Card is adjustable to many screen size and scales well.
    
    - Implemented a transition animation when tapping, changing the view size, title and icon colors.
    
    - Added some simple scaling functions to handle multiple screen sizes.
    
    - Flexible Card item list, can hadle many entires per day. For an actual store, 3 entry should be max.
    
    - Render and Convert funciton Test.
    
    - Designed so that the start/closing time, starts and ends on the same line, more visually pleasing.
    

##Json Output Formatting Info
    I tried to add comment and explaining but it better if I do it here again.
    
    - We have 2 nested loops 
        * "Days loop" => Will loop the day  {
                inside we have second loop.
                * "entries loop" => will loop current day (open/close) entries.
        }
          
    before these loops we have 6 initial values, they are outside because I want still save the values when going to the
     next entries loop => next Day loop => In case the store is still open.
     
    - 
      isOpen  Boolean =>  Important value, to check if the store is still open at the end of the current day.
      updatePrevious Boolean; serves to update previous day with the "close" entry.
      currentDayOfWeek Boolean; fetch current day as a string. compare it later with json input day.
      openTimeValue / closeTimeValue = {};  Used to save open/close entries.
      
      
      newDatesFormatArray = [];  Will contain our new converted output. We will push an object containing each day
       entries 
        date: day,
              - isClosed => if we have no enterie ,
              - isToday: if that day is  actually today
              - time: [
                          {
                            "open":{
                                     "hour": 4,
                                     "convention":"PM"
                                   },
                           "close":{
                                     "hour": 11,
                                     "convention":"PM"
                                   }     
                           }
                       ],
                       
      I decided to use this format for the opening and closing time because it is common to want to change the date
       format between 12/24 clock convention, this will make it easier and cleaner.
       
##Json Output Formatting Logic
    
        - We iterate throught the json's Days.
        - On Each day we take the the openning and closing time and convert it to 12-h convention.
        - if the last entry for that day was a closing time:
             * isOpen is set to false
             * we push an object containing the opening/closing time. 
             * done with that day.
        - if the last or only entry for that day was opening time:
              * isOpen is set to true;
              * we push an object containing the opening time only. 
              * We iterate to the next day
              * we check that the next day first value is a closing enrty.
              * take it and update the object in the previous eteration. 
              * set updatePrevious to false,
              * End the etration and let it continue to the next one.
              
        - average execution time was around 0.27 milliseconds
    
    
Running the application
---
1- Similar to most react-project:

- Installing the nodules

        yarn install
        


2. We have 2 releases for each platform:
        
        * Android:
        
            Debug : yarn ad
            
            "ad": "watchman watch-del-all && yarn cache clean --force && react-native run-android --variant=Debug",
            
            Release : yarn ar
            
            "ar": "watchman watch-del-all && yarn cache clean --force && react-native run-android --variant=Release",
            
        * IOS
        
           Debug : yarn id
           
             "id": "watchman watch-del-all && yarn cache clean --force && react-native run-ios --configuration=Debug",
             
            Release : yarn ir
            
             "ir": "watchman watch-del-all && yarn cache clean --force && react-native run-ios --configuration=Release",
		
		    Note: 
		        
		        Current react-native 0.61.5 uses iPhone 11 simulator, will fail if not found. launch it from Xcode or
		        
		    Try: 
		    
		    xcrun instruments -s devices
		    
		    react-native run-ios --configuration= XXXX --device "One of the devices found"
     
    
    

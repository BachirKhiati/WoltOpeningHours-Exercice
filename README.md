## Wolt exercise - React Native

Write a program that takes a Json as input and display the details formatted on a Card.

## Extra Libraries added

- Animation mainly:

        "react-native-reanimated"

        "react-native-redash"

         "react-native-gesture-handler"


- Icons:

       "react-native-vector-icons"


- Language:

       "react-native-i18n"

  - Note: Original repo is "Deprecated", I'm using my updated branch.

## Application Details

    - Quick fix:

        * I was using new Date().toLocaleDateString to get currect day of the week directly.
        It does work on debug mode since it's available in Chrome v8 Engine but it's not availble yet
        in JavascriptCore engine.
       
   ---    
        
    - Update Note:
           
        * Transitioned Project to Typescript.
        
        * Setup Strict Linter rules with ESLint and Prettier
        
        * Updated the conversion function: more fault-proof/array checks/object key checks/ 
                updated the logic tohandle more extreme cases like still open over Monday.
                
        * Set up jest/enzyme/utility tests + unit tests.
        
        * Pre-commit check: Formatting, Lint/Typescript check/ running unit tests.
        
        * End-to-End test setup and tests.
      
 

---


  **General:**

    - Implemented and configured Multi-Language support.
        * English
        * Finnish

    - Used 3rd party libraries to handle the animations.

    - Implemented Fastlane for build and store delivery.

    - Implemented Splash screen for both native platform and updated the icons.

        * in android, I linked my own native library directly to the project. check it.

    - Linked manually only one font that I'm using: "SimpleLineIcons".

    - Also, linked manually the 3 Roboto fonts needed.

    - Opening hours Card is adjustable to many screen size and scales well.

    - Implemented a transition animation when tapping, changing the view size, title and icon colors.

    - Added some simple scaling functions to handle multiple screen sizes.

    - Flexible Card item list, can handle many entires per day. For an actual store, 3 entry should be max.

    - Render and Convert function Test.

    - Only portrait mode allowed for this exercise. Configured natively.

    - Designed so that the start/closing time, starts and ends on the same line, more visually pleasing.

##Json Output Formatting Info
I tried to add comment and explaining but it better if I do it here again.
  
         - We have 2 nested loops
        _ "Days loop" => Will loop the day {
        inside we have second loop.
        _ "entries loop" => will loop current day (open/close) entries.
        }
          
         before these loops we have 6 initial values, they are outside because I want still save the values when going to the
        next entries loop => next Day loop => In case the store is still open.
          
         -
        isOpen Boolean => Important value, to check if the store is still open at the end of the current day.
        updatePrevious Boolean; serves to update previous day with the "close" entry.
        currentDayOfWeek Boolean; fetch current day as a string. compare it later with json input day.
        openTimeValue / closeTimeValue = {}; Used to save open/close entries.
          
          
         newDatesFormatArray = []; Will contain our new converted output. We will push an object containing each day
        entries
        date: day, - isClosed => if we have no enterie , - isToday: if that day is actually today - time: [
        {
            "open":{
            "hour": 4,
            "period":"PM"
        },
            "close":{
            "hour": 11,
            "period":"PM"
            }
         }
        ],
          
         I decided to use this format for the opening and closing time because it is common to want to change the date
        format between 12/24 clock convention, this will make it easier and cleaner.
  
  
##Json Output Formatting Logic
 
        - We iterate through the json's Days. - On Each day we take the the opening and closing time and convert it to 12-h convention. - if the last entry for that day was a closing time:
        _ isOpen is set to false
        _ we push an object containing the opening/closing time.
        _ done with that day. - if the last or only entry for that day was opening time:
        _ isOpen is set to true;
        _ we push an object containing the opening time only.
        _ We iterate to the next day
        _ we check that the next day first value is a closing entry.
        _ take it and update the object in the previous iteration.
        _ set updatePrevious to false,
        _ End the iteration and let it continue to the next one.
        - average execution for time the current json file in .src/utils/input was around 0.27 milliseconds
          
  
Running the application

---

1- Similar to most react-project:

- Installing the nodules

        yarn install


2. We have 2 releases for each platform:


        MAC OS:

        * requirements:

            "watchman"


        * Android:

            Debug : yarn ad

            "ad": "watchman watch-del-all && yarn cache clean --force && react-native run-android --variant=Debug",

            Release : yarn ar

            "ar": "watchman watch-del-all && yarn cache clean --force && react-native run-android --variant=Release",

            Note:

    	        You may need to have the Android Emulator open or a device connected  before you launch the compilation - React-native Bug.

        * IOS

           Pods: are linked and included in the repo, no installation needed.

           Debug : yarn id

             "id": "watchman watch-del-all && yarn cache clean --force && react-native run-ios --configuration=Debug",

            Release : yarn ir

             "ir": "watchman watch-del-all && yarn cache clean --force && react-native run-ios --configuration=Release",
    	s
    	    Note:

    	        Current react-native 0.61.5 uses iPhone 11 simulator, will fail if not found. launch it from Xcode or

    	    Try:

    	    xcrun instruments -s devices

    	    react-native run-ios --configuration= XXXX --device "One of the devices found"



Tests
---


  Jest/Enzyme/Unit tests.
  
    Run:
        yarn test
        
        
  End-to-End tests:
    
    Run:
        yarn e2e:build:ios
        yarn e2e:test:ios
        
        Default emulator: Iphone Xr for the test, check package.json.

let students = [] ; // Creates empty student array to store entered students
var x = 1 ; // Used for ID of students

var arr = new Array() ;

const form = document.getElementById('SEIForm') ; // Transfers SEI form to JS

// Declares the matched list of classes for students here because there was problems inserting it elsewhere in the program
var realClasses = [] ;

// Declares necessary variables for the dynamic table
var n = 1 ;
var list1 = [] ;
var list2 = [] ;
var list3 = [] ;
var list4 = [] ;
var list5 = [] ;

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit').addEventListener('click', addStudent) ;
}) ;

// Validates GPA entry from user
function gpaValid()
{
    var realGPA = document.getElementById("SEIgpa").value ;

    if(realGPA > 4 || realGPA < 0)
    {
        return false ;
    }

    if(isNaN(realGPA) == true)
    {
        return false ;
    }

    return true ;

}

// Validates Name entry from user
function nameValid()
{
    var realname = document.getElementById("SEIname").value ;

    if(isNaN(realname) == false)
    {
        return false ;
    }

    return true ;

}

// Checks for at least one class selected from user
function classValid()
{
    var mathValid = TorF(document.getElementById('mathematics')) ;
    var englValid = TorF(document.getElementById('english')) ;
    var sciValid = TorF(document.getElementById('science')) ;
    var histValid = TorF(document.getElementById('history')) ;
    var artValid = TorF(document.getElementById('artist')) ;
    var theaValid = TorF(document.getElementById('theatre')) ;

    var classes = [mathValid, englValid, sciValid, histValid, artValid, theaValid] ;

    for(var i = 0 ; i < classes.length ; i++)
    {
        if(classes[i] == true)
        {
            return true ; 
        }
    }
    
    return false ; 

}

// Translates the checked boxes under student entry into boolean expressions
function TorF(val){

    if(val.checked == true)
    {
        return true ;
    }
    else
    {
        return false ; 
    }
}

// Used for the print feature in the dynamic table
function enrolledClasses(val){

    if(val.checked == true)
    {
        return " " + val.id ;
    }
    else
    {
        return "";
    }
}

// Adds student to object array & localStorage
const addStudent = (stu) => {

    /*
    Prevents an empty form submission. I most likely dont need this anymore because of the other data validation
    but I am scared to take this out.
    */
    stu.preventDefault() ;

    if(nameValid() == true && gpaValid() == true && classValid() == true)
    {
        // Student object for each submission
        let student = {

            ID: x++,

            Name: document.getElementById('SEIname').value,

            GPA: document.getElementById('SEIgpa').value,

            math: TorF(document.getElementById('mathematics')),
            engl: TorF(document.getElementById('english')),
            sci: TorF(document.getElementById('science')),
            hist: TorF(document.getElementById('history')),
            art: TorF(document.getElementById('artist')),
            thea: TorF(document.getElementById('theatre'))

        }  

        students.push(student) ; // Pushes entry into array
       
        document.querySelector('form').reset() ; // Clears form post-submission

        localStorage.setItem('studentList', JSON.stringify(students) ) ; // Saves entries into local storage as a string

        return students ;
    }

    else
    {
        alert("Please enter a valid name, GPA, and at least one class \n Example: \n     Melvin,Grant \n     4.0 \n     Math - Science - History") ;
    }
    
}   

// Deletes student from table and database from the button on the table
function deleteStudent(val)
{ 
    // Obtains the value of the entire row in HTML
    var s = val.parentNode.parentNode ;

    // Obtains the value of the ID cell in the row selected by the user from the delete button
    var cell = s.getElementsByTagName('td')
    var removeID = cell[0].innerText ;

    // Matches the ID and splices the student from the array of objects
    for(var i = 0 ; i < students.length ; i++)
    {

        if(students[i].ID == removeID)
        {
            students.splice(i,1)
        }

    }

    // Removes the row completely
    s.parentNode.removeChild(s) ;

    n-- ;
}

// Adds a row to the dynamic table with the information given from the user if it is valid
function addRow(){

    // Creates a new row in the table
    var AddRown = document.getElementById('table') ;
    var NewRow = AddRown.insertRow(n) ;

    // Validates name, gpa, and class entries
    if(nameValid() == true && gpaValid() == true && classValid() == true)
    {   
        // Fills in values for each column of the table with the correct data of each student
        list1[n] = x ;
    
        list2[n] = document.getElementById('SEIname').value ;

        list3[n] = document.getElementById('SEIgpa').value ;

        list4[n] = enrolledClasses(document.getElementById('mathematics')) ;
        list4[n] += enrolledClasses(document.getElementById('english')) ;
        list4[n] += enrolledClasses(document.getElementById('science')) ;
        list4[n] += enrolledClasses(document.getElementById('history')) ;
        list4[n] += enrolledClasses(document.getElementById('artist')) ;
        list4[n] += enrolledClasses(document.getElementById('theatre')) ;

        // Inserts cells in the row
        var cell1 = NewRow.insertCell(0) ;
        var cell2 = NewRow.insertCell(1) ;
        var cell3 = NewRow.insertCell(2) ;
        var cell4 = NewRow.insertCell(3) ;
        var cell5 = NewRow.insertCell(4) ;

        // Inserts the filled data into the dynamic table
        cell1.innerHTML = list1[n] ;
        cell2.innerHTML = list2[n] ;
        cell3.innerHTML = list3[n] ;
        cell4.innerHTML = list4[n] ;
        cell5.innerHTML = '<input type="submit" name="Delete" value="Delete" class="submit" onclick="deleteStudent(this) ;">' ;

        // Sets the row ID to row for formatting purposes
        NewRow.setAttribute('id','row') ;

        n++ ;
    }
}

// Checks if the user-entered name is valid and then outputs the statistics if necessary
function searchName()
{
    // Gathers the user-input for desired name and makes them accessible variables
    var realname = document.getElementById("nSearch").value ;

    var output = false ;

    // Checks to see if the user-entered name is valid and sets output to true
    for(var i = 0 ; i < students.length ; i++)
    {

        if(realname == students[i].Name)
        {
            outputNameStats() ;

            output = true ;
        }
    }

    // Alerts the user if we cannot find the student
    if(output == false)
    {
        alert("Student Not Found!") ;
    }

    document.getElementById("Search").reset() ; // Clears form post-submission

    output = false ; // Resets the value of output because things don't work when I don't do this

}

// Checks if the user-entered ID is valid and then outputs the statistics if necessary
function searchID()
{
    // Gathers the user-input for desired ID and makes them accessible variables
    var ID = document.getElementById("IDSearch").value ;

    var output = false;

    // Finds the student with the ID given to us and sets output to true which will make the alert not trigger
    for(var i = 0 ; i < students.length ; i++)
    {
        if(ID == students[i].ID)
        {
            outputIDStats() ;

            output = true ;
        }
    }

    // Alerts the user if we cannot find the student
    if(output == false)
    {
        alert("Student Not Found!") ;
    }

    document.getElementById("IDSearch").value = "" ; ; // Clears form post-submission

}

// Loops through the classes of each individual student to check for AT LEAST the same classes as passed into it
function classLoop(arr1, arr2, arr3, counter)
{
    // Sets necessary variables for calculations
    var testClasses = arr1 ;
    var actClasses = arr2 ;
    realClasses = arr3 ;

    //console.log(testClasses) ;
    //console.log(actClasses) ;
    //console.log(realClasses) ;

    /*
    Goes through each test class that is entered from the user and tests if the current student has it marked as true.
    If the current student doesn't have a true value for the equivalent test class value, then the loop immediately breaks 
    and the student that we are evaluating is moved up one index. 
    If the loop gets to the last class and isnt broken by the tests, then the student is added to the realClasses array which 
    holds all students that have the same classes as the ones we are looking for.
    */
    for(var j = 0 ; j < testClasses.length ; j++)
    {
        if(testClasses[j] == true) 
        {

            if(actClasses[j] != true) 
            {

                break ; 
            }
            else 
            {

                if(j == testClasses.length - 1) 
                {
                    realClasses[counter] = students[counter] ;
                }
            }
        }

        else 
        {

            if(j == testClasses.length - 1) 
            {
                realClasses[counter] = students[counter] ;
            }
            else 
            {
                continue ;
            }
        }
    }
}

// Takes the test classes given by the user and compares them to every student 
function searchClass()
{

    // Gathers the user-input for desired search classes and makes them accessible variables
    var Math = TorF(document.getElementById("math")) ;
    var Engl = TorF(document.getElementById("engl")) ;
    var Sci = TorF(document.getElementById("sci")) ;
    var Hist = TorF(document.getElementById("hist")) ;
    var Art = TorF(document.getElementById("art")) ;
    var Thea = TorF(document.getElementById("thea")) ;

    var output = false ; // sets base-value to false and will be used as a checker for if there is a student that meets the requirements later on

    var testClasses = [Math,Engl,Sci,Hist,Art,Thea] ; // List of desired class results
    var actClasses = [] ; // List of the classes each student is taking

    // Loops through the list of students and tests if their classes are AT LEAST what the test classes are
    // The student can have more classes than the user wants and still be displayed, but not less
    for(var i = 0 ; i < students.length ; i++)
    {
        actClasses = [students[i].math, students[i].engl, students[i].sci, students[i].hist, students[i].art, students[i].thea] ;

        classLoop(testClasses,actClasses,realClasses, i) ;
    }

    // If there is at least one student that meets the reqs then the alert is ignored
    if(realClasses.length != 0)
    {
        output = true ; 
    }

    // If a student cannot be found that meets the reqs
    if(output == false)
    {
        alert("Student Not Found!") ;
    }
    else
    {
        outputClassStats() ;
    }

    // Unchecks the boxes in the search fieldset for formatting purposes
    document.getElementById('math').checked = false ;
    document.getElementById('engl').checked = false ;
    document.getElementById('sci').checked = false ;
    document.getElementById('hist').checked = false ;
    document.getElementById('art').checked = false ;
    document.getElementById('thea').checked = false ;


    // Resets the value of these variables because things get messy if I dont do that
    testClasses = [] ;
    actClasses = [] ;
    output = false ; 

}

// Displays the statistics of the single user-entered student based off of name
function outputNameStats()
{
    // Makes the container visible to the user
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    // Sets local variables to html IDs
    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    var nameSearch = document.getElementById('nSearch').value ;

    var realStudent ; 

    // Finds the user-entered student name from the list of students
    for(var i = 0 ; i < students.length ; i++)
    {
        if(nameSearch == students[i].Name)
        {
            realStudent = students[i] ;
        }
    }

    var classes = [realStudent.math, realStudent.engl, realStudent.sci, realStudent.hist, realStudent.art, realStudent.thea] ;

    var classSearch ;

    /*  
    Because of the Boolean value of the enrolled class values, I couldnt
    find a way to express individuality between the classes without manually
    inserting these if statements. It's so ugly. 
    */ 

    if(classes[0] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Math, " ;
        }
        else
        {
            classSearch += "Math, " ;
        }  
    }
    if(classes[1] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "English, " ;
        }
        else
        {
            classSearch += "English, " ;
        }  
    }
    if(classes[2] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Science, " ;
        }
        else
        {
            classSearch += "Science, " ;
        }  
    }
    if(classes[3] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "History, " ;
        }
        else
        {
            classSearch += "History, " ;
        }  
    }
    if(classes[4] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Art, " ;
        }
        else
        {
            classSearch += "Art, " ;
        }  
    }
    if(classes[5] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Theatre, " ;
        }
        else
        {
            classSearch += "Theatre, " ;
        }  
    }

    classSearch = classSearch.slice(0, -2) ;


    section1.innerHTML = ('Name: ' + realStudent.Name) ;

    section2.innerHTML = ('ID: ' + realStudent.ID) ;

    section3.innerHTML = ('GPA: ' + realStudent.GPA) ;

    section4.innerHTML = ('Enrolled Classes: ' + classSearch) ;

}

// Displays the statistics of the single user-entered student based off of ID
function outputIDStats()
{
    // Makes the container visible to the user
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    // Sets local variables to html IDs
    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    var IDSearch = document.getElementById('IDSearch').value ;

    var realStudent ; 

    // Finds the user-entered student name from the list of students
    for(var i = 0 ; i < students.length ; i++)
    {
        if(IDSearch == students[i].ID)
        {
            realStudent = students[i] ;
        }
    }

    var classes = [realStudent.math, realStudent.engl, realStudent.sci, realStudent.hist, realStudent.art, realStudent.thea] ;

    var classSearch ;

    /*  
    Because of the Boolean value of the enrolled class values, I couldnt
    find a way to express individuality between the classes without manually
    inserting these if statements. It's so ugly. 
    */ 

    if(classes[0] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Math, " ;
        }
        else
        {
            classSearch += "Math, " ;
        }  
    }

    if(classes[1] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "English, " ;
        }
        else
        {
            classSearch += "English, " ;
        }  
    }

    if(classes[2] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Science, " ;
        }
        else
        {
            classSearch += "Science, " ;
        }  
    }

    if(classes[3] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "History, " ;
        }
        else
        {
            classSearch += "History, " ;
        }  
    }

    if(classes[4] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Art, " ;
        }
        else
        {
            classSearch += "Art, " ;
        }  
    }

    if(classes[5] == true)
    {
        if(classSearch == undefined)
        {
            classSearch = "Theatre, " ;
        }
        else
        {
            classSearch += "Theatre, " ;
        }  
    }

    // Removes the last two characters from the string to get the correct formatting without the comma or space
    classSearch = classSearch.slice(0, -2) ;

    // Outputs desired variables into the html document
    section1.innerHTML = ('Name: ' + realStudent.Name) ;

    section2.innerHTML = ('ID: ' + realStudent.ID) ;

    section3.innerHTML = ('GPA: ' + realStudent.GPA) ;

    section4.innerHTML = ('Enrolled Classes: ' + classSearch) ;

}

// Displays the statistics of the single user-entered student based off of enrolled classes
function outputClassStats()
{
    // Makes the container visible to the user
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    // Sets local variables to html IDs
    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    // Declares necessary variables for calculations
    var studentsNames = [] ;
    var outputNames = [] ;

    var studentsGPAs = [] ;
    var highGPA ;
    var meanGPA = 0 ;
    var lowGPA ;
    var counter = 0 ;

    var RCLength = realClasses.length ;


    // Checks for undefined objects in the array - They can be caused easily with multiple class searches
    for(var i = 0 ; i < realClasses.length ; i++)
    {
        if(realClasses[i] == undefined)
        {
            realClasses[i] = realClasses[i+1] ;
            RCLength = RCLength - 1 ;
        }
    }


    // Sets up the names to be output from the certified names used in the function
    for(var i = 0 ; i < RCLength ; i++)
    {

        studentsNames[i] = realClasses[i].Name ;

        if(outputNames.length == 0)
        {
            outputNames[i] = (studentsNames[i]) ;
        }
        else if(outputNames.length > 0 && outputNames.length < realClasses.length)
        {
            outputNames[i] = (" " + studentsNames[i]) ;
        }
        else
        {
            outputNames[i] = (studentsNames[i]) ;
        }
        
    }

    // Converts the GPA values from strings into integers
    for(var i = 0 ; i < realClasses.length; i++)
    {
        studentsGPAs[i] = realClasses[i].GPA ; 

        studentsGPAs[i] = Number(studentsGPAs[i]) ;
    }

    // Performs calculations for high, mean, and low GPA values
    for(var i = 0 ; i < studentsGPAs.length ; i++)
    {

        if(i == 0) 
        {
            highGPA = studentsGPAs[i] ;
            lowGPA = studentsGPAs[i] ;
            meanGPA = studentsGPAs[i] ;

            counter++ ;

        }

        else
        {
            if(studentsGPAs[i] > highGPA)
            {
                highGPA = studentsGPAs[i] ;
            }

            if(studentsGPAs[i] < lowGPA)
            {
                lowGPA = studentsGPAs[i] ;
            }

            meanGPA += studentsGPAs[i] ;

            counter++ ;

        }

    }

    meanGPA = meanGPA / counter ; // Calculates actual mean


    // Outputs desired variables into the html document
    section1.innerHTML = ('Students: ' + outputNames) ;

    section2.innerHTML = ('High GPA: ' + highGPA) ;

    section3.innerHTML = (('Mean GPA: ' + meanGPA)) ;

    section4.innerHTML = ('Low GPA: ' + lowGPA) ;
    

    // resets the certified array of students in case the user needs to search through classes again
    realClasses = [] ;
    
}

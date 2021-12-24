let students = [] ; // Creates empty student array to store entered students
var x = 1 ; // Used for ID of students

var arr = new Array() ;

const form = document.getElementById('SEIForm') ; // Transfers SEI form to JS

var realClasses = [] ;

var n = 1 ;
var list1 = [] ;
var list2 = [] ;
var list3 = [] ;
var list4 = [] ;
var list5 = [] ;

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit').addEventListener('click', addStudent) ;
}) ;

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

function nameValid()
{
    var realname = document.getElementById("SEIname").value ;

    if(isNaN(realname) == false)
    {
        return false ;
    }

    return true ;

}

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

const addStudent = (stu) => {

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

function deleteStudent(val)
{ 
    var s = val.parentNode.parentNode ;

    var cell = s.getElementsByTagName('td')
    var removeID = cell[0].innerText ;

    for(var i = 0 ; i < students.length ; i++)
    {

        if(students[i].ID == removeID)
        {
            //console.log(students[i].ID)

            students.splice(i,1)
        }

        //console.log(students[i]) ;

    }

    s.parentNode.removeChild(s) ;

    n-- ;
}

function addRow(){


    var AddRown = document.getElementById('table') ;
    var NewRow = AddRown.insertRow(n) ;

    if(nameValid() == true && gpaValid() == true && classValid() == true)
    {   
        list1[n] = x ;
    
        list2[n] = document.getElementById('SEIname').value ;

        list3[n] = document.getElementById('SEIgpa').value ;

        list4[n] = enrolledClasses(document.getElementById('mathematics')) ;
        list4[n] += enrolledClasses(document.getElementById('english')) ;
        list4[n] += enrolledClasses(document.getElementById('science')) ;
        list4[n] += enrolledClasses(document.getElementById('history')) ;
        list4[n] += enrolledClasses(document.getElementById('artist')) ;
        list4[n] += enrolledClasses(document.getElementById('theatre')) ;

        var cell1 = NewRow.insertCell(0) ;
        var cell2 = NewRow.insertCell(1) ;
        var cell3 = NewRow.insertCell(2) ;
        var cell4 = NewRow.insertCell(3) ;
        var cell5 = NewRow.insertCell(4) ;

        cell1.innerHTML = list1[n] ;
        cell2.innerHTML = list2[n] ;
        cell3.innerHTML = list3[n] ;
        cell4.innerHTML = list4[n] ;
        cell5.innerHTML = '<input type="submit" name="Delete" value="Delete" class="submit" onclick="deleteStudent(this) ;">' ;

        NewRow.setAttribute('id','row') ;

        n++ ;
    }
}

function searchName()
{
    var realname = document.getElementById("nSearch").value ;

    var output = false ;

    for(var i = 0 ; i < students.length ; i++)
    {
        //console.log(list2[i]) ;
        //console.log(realname) ;

        if(realname == students[i].Name)
        {
            //console.log(students[i].Name)

            outputNameStats() ;

            output = true ;
        }
    }

    if(output == false)
    {
        alert("Student Not Found!") ;
    }

    document.getElementById("Search").reset() ; // Clears form post-submission

    output = false ; 

}

function searchID()
{
    var ID = document.getElementById("IDSearch").value ;

    var output = false;

    for(var i = 0 ; i < students.length ; i++)
    {
        if(ID == students[i].ID)
        {
            outputIDStats() ;

            output = true ;
        }
    }

    if(output == false)
    {
        alert("Student Not Found!") ;
    }

    document.getElementById("IDSearch").value = "" ; ; // Clears form post-submission

}

function classLoop(arr1, arr2, arr3, counter)
{
    var testClasses = arr1 ;
    var actClasses = arr2 ;
    realClasses = arr3 ;

    //console.log(testClasses) ;
    //console.log(actClasses) ;
    //console.log(realClasses) ;

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

function searchClass()
{

    var Math = TorF(document.getElementById("math")) ;
    var Engl = TorF(document.getElementById("engl")) ;
    var Sci = TorF(document.getElementById("sci")) ;
    var Hist = TorF(document.getElementById("hist")) ;
    var Art = TorF(document.getElementById("art")) ;
    var Thea = TorF(document.getElementById("thea")) ;

    var output = false ;

    var testClasses = [Math,Engl,Sci,Hist,Art,Thea] ; // List of desired class results
    var actClasses = [] ; // List of the classes each student is taking

    for(var i = 0 ; i < students.length ; i++)
    {
        actClasses = [students[i].math, students[i].engl, students[i].sci, students[i].hist, students[i].art, students[i].thea] ;

        classLoop(testClasses,actClasses,realClasses, i) ;
    }

    if(realClasses.length != 0)
    {
        output = true ; 
    }

    if(output == false)
    {
        alert("Student Not Found!") ;
    }
    else
    {
        outputClassStats() ;
    }

    document.getElementById('math').checked = false ;
    document.getElementById('engl').checked = false ;
    document.getElementById('sci').checked = false ;
    document.getElementById('hist').checked = false ;
    document.getElementById('art').checked = false ;
    document.getElementById('thea').checked = false ;


    testClasses = [] ;
    actClasses = [] ;
    output = false ; 

}

function outputNameStats()
{
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section2b = document.getElementById('searchResults2b') ;
    var section2c = document.getElementById('searchResults2c') ;
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    var nameSearch = document.getElementById('nSearch').value ;

    var realStudent ; 

    for(var i = 0 ; i < students.length ; i++)
    {
        if(nameSearch == students[i].Name)
        {
            realStudent = students[i] ;
        }
    }

    var classes = [realStudent.math, realStudent.engl, realStudent.sci, realStudent.hist, realStudent.art, realStudent.thea] ;

    var classSearch ;

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
    section2b.innerHTML = ('') ;
    section2c.innerHTML = ('') ;

    section3.innerHTML = ('GPA: ' + realStudent.GPA) ;

    section4.innerHTML = ('Enrolled Classes: ' + classSearch) ;

}

function outputIDStats()
{
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section2b = document.getElementById('searchResults2b') ;
    var section2c = document.getElementById('searchResults2c') ;
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    var IDSearch = document.getElementById('IDSearch').value ;

    var realStudent ; 

    for(var i = 0 ; i < students.length ; i++)
    {
        if(IDSearch == students[i].ID)
        {
            realStudent = students[i] ;
        }
    }

    var classes = [realStudent.math, realStudent.engl, realStudent.sci, realStudent.hist, realStudent.art, realStudent.thea] ;

    var classSearch ;

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
    section2b.innerHTML = ('') ;
    section2c.innerHTML = ('') ;

    section3.innerHTML = ('GPA: ' + realStudent.GPA) ;

    section4.innerHTML = ('Enrolled Classes: ' + classSearch) ;

}

function outputClassStats()
{
    var stats = document.querySelector(".sStats") ;

    stats.style.visibility="visible" ;

    var section1 = document.getElementById('searchResults1') ; 
    var section2 = document.getElementById('searchResults2') ; 
    var section3 = document.getElementById('searchResults3') ; 
    var section4 = document.getElementById('searchResults4') ; 

    var section2b = document.getElementById('searchResults2b') ;
    var section2c = document.getElementById('searchResults2c') ;

    var studentsNames = [] ;
    var outputNames = [] ;

    var studentsGPAs = [] ;
    var highGPA ;
    var meanGPA = 0 ;
    var lowGPA ;
    var counter = 0 ;

    var RCLength = realClasses.length ;
    

    for(var i = 0 ; i < realClasses.length ; i++)
    {
        if(realClasses[i] == undefined)
        {
            realClasses[i] = realClasses[i+1] ;
            RCLength = RCLength - 1 ;
        }
    }


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

    for(var i = 0 ; i < realClasses.length; i++)
    {
        studentsGPAs[i] = realClasses[i].GPA ; 

        studentsGPAs[i] = Number(studentsGPAs[i]) ;
    }

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

    meanGPA = meanGPA / counter ; 

    //console.log(meanGPA) ;
    //console.log(studentsGPAs) ;


    section1.innerHTML = ('Students: ' + outputNames) ;

    section2.innerHTML = ('High GPA: ' + highGPA) ;
    section2b.innerHTML = ('Mean GPA: ' + meanGPA) ;
    section2c.innerHTML = ('Low GPA: ' + lowGPA) ;

    /*section3.innerHTML = ('High GPA: ' + highGPA + '\n' + 'Median GPA: ' + medianGPA + '\n' + 'Low GPA: ' + lowGPA) ;

    section4.innerHTML = ('Enrolled Classes: ' + classSearch) ;
    */

    realClasses = [] ;
    
}
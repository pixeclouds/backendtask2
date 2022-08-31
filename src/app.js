// write your code here
const express = require("express")
const port = 3000
const app = express()
const { database } = require("./data")

app.use(express.json())


app.get('/', (req, res) => {

    let courses =  []
    //get all open courses
    database.forEach(course => {
        if(course.status == "open"){
            courses.push(course)
        } 
    });
    res.send(courses)
});


app.post('/', (req, res) => {

    let newCourse = req.body;
    database.push(newCourse)
    res.json({
        newCourse, 
        success: "New course added successfully"
    })
});

app.put('/:id', (req, res) => {

    let id = req.params.id
    let status = req.body.status
    //update course enrollment status
    database.forEach(course => {
        if(course.id == id){
            let index = database.indexOf(course)
            course.status = status;
            res.json({
                course,
                message: `Course with id ${index + 1} updated successfully`
            })
        }
    })
});

app.delete('/:id', (req, res) => {

    let id = req.params.id
     database.forEach(course => {
        if(course.id == id){
            let index = database.indexOf(course)
            database.splice(index, 1)    
            res.json(`Course with id ${index + 1} deleted successfully`)
        }
    });
});



app.listen(port, () => {
    console.log(`Crud app listening on port ${port}`)
});
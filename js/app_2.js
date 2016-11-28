/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

var model = {
    weeksInSem: 12,
    students :  [
            {name : "Slappy the Frog", daysMissed : 0, studentID : 0},
            {name : "Lilly the Lizard", daysMissed : 0, studentID : 1},
            {name : "Paulrus the Walrus", daysMissed : 0, studentID : 2},
            {name : "Gregory the Goat", daysMissed : 0, studentID : 3},
            {name : "Adam the Anaconda", daysMissed : 0, studentID : 4}
                ]
            }

var octopus = {
    init:function() {
        var weeks = model.weeksInSem;
        view.init(weeks);
    },

    getStudents:function() {
        return model.students;
    },

    addMissed:function(studentID) {
        model.students[studentID].daysMissed++;
    },

    removeMissed:function(studentID) {
        model.students[studentID].daysMissed--;
    }
};

var view = {
    init:function(weeks) {
        var students = octopus.getStudents();

        var thead = document.createElement("thead");
        thead.id = "table-head";
        document.getElementById("attendance").appendChild(thead);

        var th = document.createElement("th");
        document.getElementById("table-head").appendChild(th);
        $(th).text("Student Name");

        for (var c = 0; c < weeks; c++) {
            var th = document.createElement("th");
            th.id = "week-head" + c;
            document.getElementById("table-head").appendChild(th);
            $(th).text("Week " + (c+1));
            }

        var th = document.createElement("th");
        document.getElementById("table-head").appendChild(th);
        $(th).text("Days Missed");

        for (var i = 0; i < students.length; i++) {
            var studentRecord = students[i];
            var daysMissed = students[i].daysMissed;
            var student = students[i].studentID;
            var name = students[i].name;
            var tr = document.createElement("tr");
            tr.id = "student" + i;
            document.getElementById("attendance").appendChild(tr);
            var td = document.createElement("td");
            td.id = "student-name" + i;
            document.getElementById("student" + i).appendChild(td);
            $(td).text(name);
            for (var c = 0; c < weeks; c++) {
                var td = document.createElement("td");
                td.id = "week" + String(i) + String(c);
                document.getElementById("student" + i).appendChild(td);
                var input = document.createElement("input");
                input.id = "attendance" + String(i) + String(c);
                $(input).attr("type", "checkbox");
                document.getElementById("week" + String(i) + String(c)).appendChild(input);

            $('#attendance' + String(i) + String(c)).change(function(studentRecordCopy) {
                    return function() {
                        var copyStudentID = studentRecordCopy.studentID;
                        if ($(this).is(":checked")) {
                            octopus.addMissed(copyStudentID);
                            $("#days-missed" + copyStudentID).text(studentRecordCopy.daysMissed);
                        }
                        else {
                            octopus.removeMissed(copyStudentID);
                            $("#days-missed" + copyStudentID).text(studentRecordCopy.daysMissed);
                        }
                    };
                }(studentRecord));
            }
            var daysMissed = students[i].daysMissed;
            var td = document.createElement("td");
            td.id = "days-missed" + i;
            document.getElementById("student" + i).appendChild(td);
            $(td).text(daysMissed);
        }
    }
};

octopus.init();
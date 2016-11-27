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
            {name : "Slappy the Frog", daysMissed : 0},
            {name : "Lilly the Lizard", daysMissed : 0},
            {name : "Paulrus the Walrus", daysMissed : 0},
            {name : "Gregory the Goat", daysMissed : 0},
            {name : "Adam the Anaconda", daysMissed : 0}
                ]
            }

var octopus = {
    init:function() {
        var weeks = model.weeksInSem;
        console.log("weeks: " + weeks);
        view.init(weeks);
    },

    getStudents:function() {
        return model.students;
    }
};

var view = {
    init:function(weeks) {
        var students = octopus.getStudents();

        var thead = document.createElement("thead");
        thead.id = "table-head";
        document.getElementById("attendance").appendChild(thead);

        var td = document.createElement("td");
        document.getElementById("table-head").appendChild(td);
        $(td).text("Student Name");

        for (var c = 0; c < weeks; c++) {
            var td = document.createElement("td");
            td.id = "week-head" + c;
            document.getElementById("table-head").appendChild(td);
            $(td).text("Week " + (c+1));
            }

        var td = document.createElement("td");
        document.getElementById("table-head").appendChild(td);
        $(td).text("Days Missed");

        for (var i = 0; i < students.length; i++) {
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
const lineReader = require("line-reader");
const LineReaderSync = require("line-reader-sync");

function link_student_id(email_ID) {
  console.log("Student Email ID: " + email_ID);
  lineReader.eachLine("student_id_email.csv", function (line) {
    email_ID_file = line.split(",")[1];
    student_id = line.split(",")[0];
    if (email_ID == email_ID_file) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({ total_days: student_find_activities(student_id) });
        }, 0);
        //return student_find_activities(student_id);
      });
    }
  });
}

function days_worked(stu_timestamps_people_id, student_ID, total_days) {
  days = [];
  stu_timestamp_people_id = stu_timestamps_people_id.split("*&*");
  stu_timestamp_people_id.forEach((element) => {
    stu_ID = element.split("/")[1];
    timestamp_single = element.split("/")[0];
    if (stu_ID == student_ID) {
      date = timestamp_single.split("T")[0];
      days.push(date);
    }
  });
  var days_set = new Set(days);
  console.log("Days worked: " + days_set.size);
  let days_set_array = [];
  days_set.forEach((v) => days_set_array.push(v));
  console.log("Dates: " + days_set_array);
  total_days = total_days + days_set.size;
  return total_days;
}

function student_find_activities(student_ID) {
  var total_days = 0;
  console.log("Student ID: " + student_ID + "\n");
  lrs = new LineReaderSync("drive_activitiy_files.txt");
  while (true) {
    var line = lrs.readline();
    if (line === null) {
      break;
    } else {
      stu_doc_id = line.split("***")[0];
      stu_email_id = line.split("***")[1];
      stu_doc_name = line.split("***")[2];
      stu_timestamps_people_id = line.split("***")[3];
      if (line.includes(student_ID)) {
        console.log(stu_doc_name);
        total_days = days_worked(
          stu_timestamps_people_id,
          student_ID,
          total_days
        );
        console.log("Total days worked: " + total_days + "\n");
      }
    }
  }
  return total_days;
}

function run(email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function (data) {
      var a = link_student_id(email);
      a.then(resolve(data));
    }, 0);
  });
}

module.exports = { run, link_student_id, student_find_activities };

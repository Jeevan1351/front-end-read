const lineReader = require("line-reader");
const LineReaderSync = require("line-reader-sync");

function link_student_id(email_ID, callback, superman) {
  console.log("Student Email ID: " + email_ID);
  var lrs1 = new LineReaderSync("student_id_email.csv");
  while (true) {
    var line = lrs1.readline();
    if (line === null) {
      break;
    }
    var email_ID_file = line.split(",")[1].trim();
    var student_id = line.split(",")[0];
    if (email_ID.trim() == email_ID_file) {
      console.log("Student ID: " + student_id);
      var d = callback(student_id, superman);
      return d;
    }
  }
}

function days_worked(stu_timestamps_people_id, student_ID) {
  var all_data = [];
  var days = [];
  var days_work = 0;
  var stu_timestamp_people_id = stu_timestamps_people_id.split("*&*");
  stu_timestamp_people_id.forEach((element) => {
    var stu_ID = element.split("/")[1];
    var timestamp_single = element.split("/")[0];
    if (stu_ID == student_ID) {
      var date = timestamp_single.split("T")[0];
      days.push(date);
    }
  });
  var days_set = new Set(days);
  days_work = days_set.size;
  let days_set_array = [];
  days_set.forEach((v) => days_set_array.push(v));
  all_data.push(days_work);
  all_data.push(days_set_array);
  return all_data;
}

function student_find_activities(student_ID, batman) {
  var total_days = 0;
  var tda = [];
  var data_p_array = [];
  var total_days_1 = [];
  var lrs = new LineReaderSync("drive_activitiy_files.txt");
  while (true) {
    var line = lrs.readline();
    if (line === null) {
      break;
    } else {
      var stu_doc_name = line.split("***")[2];
      var stu_timestamps_people_id = line.split("***")[3];
      if (line.includes(student_ID)) {
        total_days_1 = batman(stu_timestamps_people_id, student_ID);
        total_days = total_days + total_days_1[0];
        total_days_1.push(stu_doc_name);
        data_p_array.push(total_days_1);
      }
    }
  }
  for (var i=0; i< data_p_array.length; i++){
    for(var j=0; j< data_p_array[i][1].length; j++){
      tda.push(data_p_array[i][1][j]);
    }
  }
  var set_dates = new Set(tda);
  console.log("Dates worked: ",set_dates);
  data_p_array.unshift(set_dates.size);
  return data_p_array;
}
module.exports = {
  lk: link_student_id,
  sfa: student_find_activities,
  dw: days_worked,
};

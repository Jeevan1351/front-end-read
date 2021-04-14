const lineReader = require('line-reader');
const LineReaderSync = require("line-reader-sync")

function link_student_id(email_ID, callback, superman){
    console.log("Student Email ID: "+email_ID);
    var lrs1=new LineReaderSync("student_id_email.csv");
    while(true){
        var line = lrs1.readline();
        if(line === null){
            break;
        }
        var email_ID_file=line.split(',')[1].trim();
        var student_id=line.split(',')[0];
        //console.log("***"+email_ID+"***"+line.split(',')[1].trim()+"***\n");
        if(email_ID.trim() == email_ID_file ){
            console.log("H1");
            var d = callback(student_id, superman); 
            //console.log(d);
            console.log("SUCCESS!\n");
            return d;
            
        }
    }
}
function days_worked(stu_timestamps_people_id,student_ID, total_days) {
    function days_worked(stu_timestamps_people_id,student_ID,total_days) {
        all_data = [];
        days=[];
        var days_work = [];
        stu_timestamp_people_id=stu_timestamps_people_id.split("*&*");
        stu_timestamp_people_id.forEach(element => {
            stu_ID=element.split('/')[1];
            timestamp_single=element.split('/')[0];
            if(stu_ID == student_ID) {
                date=timestamp_single.split('T')[0];
                days.push(date);
            }
        });
        var days_set=new Set(days);
        //console.log("Days worked: "+days_set.size);
        days_work.push(days_set.size);
        let days_set_array = [];
        days_set.forEach(v => days_set_array.push(v));
        //console.log("Dates: "+days_set_array);
        total_days=total_days+days_set.size;
        console.log("ARRAY OF DAYS "+days_set_array);
        //all_data.push(days.work, days_set_array, total_days);
        // all_data.push(days_set_array);
        // all_data.push(total_days);
        return total_days;
    }

}
function student_find_activities(student_ID, batman) {
    var total_days=0;
    var array = [];
    var data_p_array = [];
    //console.log("Student ID: "+student_ID+'\n');
    var lrs = new LineReaderSync("drive_activitiy_files.txt"); 
    while(true){
            var line = lrs.readline();
            if(line === null){
                break;
            }
            else{
                //var stu_doc_id=line.split('***')[0];
                //var stu_email_id=line.split('***')[1];
                var stu_doc_name = line.split('***')[2];
                var stu_timestamps_people_id = line.split('***')[3];
                if(line.includes(student_ID)) {
                    array.push(stu_doc_name)
                    total_days_1= batman(stu_timestamps_people_id,student_ID, total_days);
                    //console.log(total_days_1);
                    data_p_array.push(total_days_1);
                }
            }

    }
    data_p_array.push(array);
    return data_p_array;
}
module.exports = { lk:link_student_id, sfa : student_find_activities, dw : days_worked}; 

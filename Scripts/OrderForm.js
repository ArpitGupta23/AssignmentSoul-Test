$(document).ready(function () {
    //-------------------------------------------------START:Initialize DateTimePicker---------------------------------------------------
    $('#picker').datetimepicker({
        timepicker: true,
        datetimepicker: true,
        dateFormat: 'dd-m-yy - hh:mm',
        weeks: true,
        minDate: 0
    });
    //-------------------------------------------------END:Initialize DateTimePicker---------------------------------------------------
    //-------------------------------------------------START: Email Field Validation---------------------------------------------------
    $("#email").blur(function () {
        var EmailID = $("#email").val();
        if (EmailID) {
            if (!validateEmail(EmailID)) {
                if ($(".validation-email").length === 0) {
                    $("#email").addClass("error");
                    $("#email").parent().before("<div class='validation-email'>Please enter valid email address</div>");

                }
                $("#email").focus();
            } else {
                sendEmail(EmailID, 'NA', 'NA', 'NA','NA','NA');
                $(".validation-email").remove();
                $("#email").removeClass("error");
            }
        } else {
            $(".validation-email").remove();
            $("#email").removeClass("error");
        }
    });
    //-------------------------------------------------END: Email Field Validation---------------------------------------------------
    //-------------------------------------------------START: "Book Order" button click----------------------------------------------
    $("#bookorder").click(function () {

        var EmailID = $("#email").val();
        var Location = $("#location").val();
        var Subject = $("#subject").val();
        var WordCount = $("#wordcount").val();
        var DateTime = $("#picker").val();
        var SpecialInst = $("#specialinst").val();
        
        var ErrorCount = 0;
        if (!EmailID) {
            $("#email").addClass("error");
            ErrorCount += 1;
        }
        else {
            $("#email").removeClass("error");
            ErrorCount -= 1;
        }
        if (!Location) {
            $("#location").addClass("error");
            ErrorCount += 1;
        }
        else {
            $("#location").removeClass("error");
            ErrorCount -= 1;
        }
        if (!Subject) {
            $("#subject").addClass("error");
            ErrorCount += 1;
        }
        else {
            $("#subject").removeClass("error");
            ErrorCount -= 1;
        }
        if (!WordCount) {
            $("#wordcount").addClass("error");
            ErrorCount += 1;
        }
        else {
            $("#wordcount").removeClass("error");
            ErrorCount -= 1;
        }
        if (!DateTime) {
            $("#picker").addClass("error");
            ErrorCount += 1;
        }
        else {
            $("#picker").removeClass("error");
            ErrorCount -= 1;
        }
        if (ErrorCount > 0) {
            if ($(".validation-form").length === 0) {
                $("#bookorder").parent().before("<div class='validation-form'>Mandatory fields required</div>");
            }
            event.preventDefault();
        }
        else {
           
            if (SpecialInst === "") {
                SpecialInst = 'NA';
            }
            sendEmail(EmailID, Location, Subject, WordCount, DateTime, SpecialInst);
            $("#validation-form").remove();
        }
    });
    //--------------------------------------------------END: "Book Order" button click-------------------------------------------------

});

function sendEmail(EmailID, Location ,Subject, Words, DateTimeSelected,SI) {
    if (Subject === 'NA') {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "arpit.gupta.osv@gmail.com",
            Password: "$$+2_B9-h2SWJa@K=rkW",
            To: 'instinct225@gmail.com',
            From: EmailID,
            Subject: "New Request",
            Body: "Hi Assignment Soul,"
                + "Please find the requirements details below: Email ID: " + EmailID + "|" + " Location: " + Location + " Subject: " + Subject + "|" + " No Of Words: " + Words + "|" + " Deadline: " + DateTimeSelected + "Special Instruction: " + SI
        }
        );
    }
    else {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "arpit.gupta.osv@gmail.com",
            Password: "$$+2_B9-h2SWJa@K=rkW",
            To: 'instinct225@gmail.com',
            From: EmailID,
            Subject: "New Request",
            Body: "Hi Assignment Soul,"
                + "Please find the requirements details below: Email ID: " + EmailID + "|" + " Location: " + Location + " Subject: " + Subject + "|" + " No Of Words: " + Words + "|" + " Deadline: " + DateTimeSelected + "Special Instruction: " + SI
        }).then(
            alert("Hurray!!!!   We have got your request and we will get back to you.")
        );

    }
}

//-------------------------------------------------Function Validate Email---------------------------------------------------
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
     //---
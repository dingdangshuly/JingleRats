$(function() {
  $("#button2").click(function() {
    $.post("/signup", {
        userid: document.getElementById('textfield23').value,
        password: document.getElementById('textfield25').value
      },
      function(data, status) {
        if (data.status == 'success') {
          $("#username").html("欢迎您," + data.msg);
          $("#td1").hide();
          $("#td2").hide();
          $("#td3").hide();
          $("#td4").hide();
          $("#td5").hide();
          $("#td6").hide();
          $("#td7").show();
        } else {
          $("#username").html(data.msg);
        }
      });
  });
});


$(function() {
  $("#login").click(function() {
    $.post("/login", {
        userid: document.getElementById('textfield23').value,
        password: document.getElementById('textfield25').value,
        remember: document.getElementById('remember').checked
      },
      function(data, status) {
        if (data.status == 'success') {
          $("#username").html("欢迎您," + data.msg);
          $("#td1").hide();
          $("#td2").hide();
          $("#td3").hide();
          $("#td4").hide();
          $("#td5").hide();
          $("#td6").hide();
          $("#td7").show();
        } else {
          $("#username").html(data.msg);
          // $("#login_reg").hide();

        }
      });
  });
});


<!--
$(function() {
  $("#logout").click(function() {
    $.get("/logout", {},
      function(data, status) {
        if (data.status == 'success') {
          $("#username").html("" + data.msg);
        } else {
          $("#username").html(data.msg);
          // $("#login_reg").hide();
        }
      });
  });
});

-->
$(document).ready(function () {

    var questions = [
    {
        question: "1. What is the capital of Australia?",
        options: [
            "Sydney",
            "Melbourne",
            "Canberra",
            "Perth"
        ],
        answer: 2
    },
    {
        question: "2. Who discovered gravity?",
        options: [
            "Albert Einstein",
            "Isaac Newton",
            "Galileo Galilei",
            "Nikola Tesla"
        ],
        answer: 1
    },
    {
        question: "3. Which is the largest ocean in the world?",
        options: [
            "Indian Ocean",
            "Pacific Ocean",
            "Atlantic Ocean",
            "Arctic Ocean"
        ],
        answer: 1
    },
    {
        question: "4. Which country is home to the Great Wall?",
        options: [
            "Japan",
            "India",
            "China",
            "Thailand"
        ],
        answer: 2
    },
    {
        question: "5. Who is known as the Father of the Indian Constitution?",
        options: [
            "Mahatma Gandhi",
            "B. R. Ambedkar",
            "Jawaharlal Nehru",
            "Sardar Patel"
        ],
        answer: 1
    }
];


    var currentQuestion = 0;
    var score = 0;
    var selectedAnswers = [];

    function loadQuestion() {
        $("#quiz").fadeOut(function () {

            var q = questions[currentQuestion];
            var html = "<h3>" + q.question + "</h3>";

            for (var i = 0; i < q.options.length; i++) {
                var checked = selectedAnswers[currentQuestion] == i ? "checked" : "";
                html += "<label class='option'>" +
                        "<input type='radio' name='option' value='" + i + "' " + checked + "> " +
                        q.options[i] +
                        "</label>";
            }

            $("#quiz").html(html).fadeIn();
        });
    }

    function calculateScore() {
        score = 0;
        for (var i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] == questions[i].answer) {
                score++;
            }
        }
    }

    $("#nextBtn").click(function () {

        var selected = $("input[name='option']:checked").val();

        if (selected == undefined) {
            alert("Please select an answer before proceeding.");
            return;
        }

        selectedAnswers[currentQuestion] = parseInt(selected);

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            calculateScore();
            showResult();
        }
    });

    $("#prevBtn").click(function () {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });

    function showResult() {
        $("#quiz").hide();
        $("#prevBtn").hide();
        $("#nextBtn").hide();

        $("#result").html("You scored " + score + " out of " + questions.length);
        $("#restartBtn").show();
    }

    $("#restartBtn").click(function () {
        currentQuestion = 0;
        score = 0;
        selectedAnswers = [];
        $("#result").html("");
        $("#restartBtn").hide();
        $("#quiz").show();
        $("#prevBtn").show();
        $("#nextBtn").show();
        loadQuestion();
    });

    loadQuestion();
});

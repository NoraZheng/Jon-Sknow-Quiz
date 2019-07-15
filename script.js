$(document).ready(function() {
	//document ready

	//create a for loop which contains an event listener, so that when user choose an answer, the page automatically scrolls to the next question
	for (let q = 1; q < $('.question').length; q++) {
		$(`#a${q}, #b${q}`).click(() => {
			$(`html, body`).animate(
				{
					scrollTop: $(`#q${q + 1}`).offset().top - 50
				},
				250
			);
		});
	}

	//create a function to blink the spoiler alert
	const blinkText = () => {
		$('h2').fadeOut(400);
		$('h2').fadeIn(400);
	};

	//set blink interval to every 0.5s
	setInterval(blinkText, 800);

	//create a counter variable to store the number of attemps a user has made
	let attempt = 0;

	//create an event listener for <form> on submit
	$(`form`).on('submit', (event) => {
		event.preventDefault();

		//create a variable to store total score
		let totalScore = 0;

		//create a for loop to turn chechked radio button value into an interger, add up, then store in total score
		for (let q = 1; q <= $('.question').length; q++) {
			totalScore += parseInt($(`input[name="question${q}"]:checked`).val());
			//console.log(totalScore);
		}

		//show modal box when click submit
		$(`.modalBox`).addClass(`showModalBox`);

		//unanswered question would return a total score of NaN, create an if to check if total score is NaN
		if (isNaN(totalScore) === true) {
			$(`.boxContent`).append(
				`<p>Please make sure you have answered all questions!<br><br>(Click '&times' or press 'Esc' key to close)</p>`
			);
		} else {
			if (totalScore === 100) {
				$(`.boxContent`).append(
					`<p>Congratulations, Lord Commander! <br>You got a perfect score! <br><br></p>`,
					`<img src="./assets/know-something.gif" alt="Jon Snow laughes and says he does know some things.">`
				);
			} else if (totalScore === 0) {
				attempt++;
				$(`.boxContent`).append(
					'<img src="./assets/know-nothing.gif" alt="Ygritte tells Jon Snow that he knows nothing">',
					`<p> Your total score is 0. <br>Did you even watch the show?<br><br>(Click '&times' or press 'Esc' to try again)</p>`
				);
			} else if (0 < totalScore < 100 && attempt < 1) {
				attempt++;
				$(`.boxContent`).append(
					`<p> Your total score is ${totalScore}. <br><br>(Click '&times' or press 'Esc' to try again)</p>`,
					`<img src="./assets/keep-learning.gif" alt="Jon Snow looking miserable in a storm">`
				);
			} else {
				attempt++;
				$(`.boxContent`).append(
					//show hint after 1 failed attempt
					`<p> Your total score is ${totalScore}. <br><br>Maybe you would be interested in taking our <br><a target="_blank" href="./hint.html">accelerated GoT course</a> at the Citadel?<br><br>(Click '&times' or press 'Esc' to try again)<br></p>`,
					`<img src="./assets/keep-learning.gif" alt="Jon Snow looking miserable in a storm">`
				);
			}
		}

		//when modal box is displayed, disable submit button
		$(`input[type='submit']`).attr('disabled', true);

		//create a function to hide modal box, empty modal box content, re-enable submit button
		const closeModalBox = () => {
			$(`.modalBox`).removeClass(`showModalBox`);
			$(`.boxContent`).empty();
			$(`input[type='submit']`).attr('disabled', false);
		};
		//when clicking "x", "reset form" or pressing "Esc", execute the function above
		$(`span.close, input[type='reset']`).on('click', () => {
			closeModalBox();
		});

		$(document).keydown(function(e) {
			if (e.keyCode == 27) {
				closeModalBox();
			}
		});
	});
});

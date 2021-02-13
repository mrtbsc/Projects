
$('#tweetForm').on('submit', (e) => {
    e.preventDefault();
    console.log('submitted!');
    const inputName = $("input[name='username']");
    const inputTweet = $("input[name='tweet']");
    addTweet(inputName.val(), inputTweet.val());
    inputName.val('');
    inputTweet.val('');

})

const addTweet = (name, tweet) => {
    const newTweet = $("<li></li>")
    newTweet.html(`<li><b>${name}</b>- ${tweet}</li>`)
    $('#tweets').append(newTweet);
}

$('#tweets').click(function (e) {
    e.target.nodeName === 'LI' && e.target.remove();  //it doesn't work if one clicks in the bold part!
})



$('#tweetForm').on('submit', (e) => {
    e.preventDefault();
    console.log('submitted!');
    const username = $("input[name='username']").val();
    const tweet = $("input[name='tweet']").val();
    addTweet(username, tweet);
})

const addTweet = (name, tweet) => {
    const newTweet = $("<li></li>")
    newTweet.html(`<li><b>${name}</b>- ${tweet}</li>`)
    $('#tweets').append(newTweet);
}
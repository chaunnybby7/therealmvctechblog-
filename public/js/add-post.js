async function newFormHandler(event) {
    event.preventDefault();

    // capture values of a form considered to be add-post
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title, 
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // if route is received properly, redirect user to dashboard page
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#add-post-form').addEventListener('submit', newFormHandler);
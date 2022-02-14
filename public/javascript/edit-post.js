

async function updatePostHandler(event) {
    event.preventDefault();
    const id = document.URL.split('/')
    const title = document.querySelector("input[name='post-title']").value;
    const response = await fetch(`/api/posts/${id[id.length-1]}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', updatePostHandler);
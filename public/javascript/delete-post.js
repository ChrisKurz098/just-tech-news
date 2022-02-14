

async function deletePostHandler(event) {
    event.preventDefault();
    const id = document.URL.split('/')
    const response = await fetch(`/api/posts/${id[id.length-1]}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);
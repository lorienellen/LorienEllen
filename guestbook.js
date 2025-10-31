/* Custom Cursor across all pages */
const cursor = document.querySelector('.cursor');

const positionCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursor.style.top = `${mouseY}px`;
  cursor.style.left = `${mouseX}px`;
};

window.addEventListener('mousemove', positionCursor);

/* Guest Book */
/* Maximum Comments at any one time */
const MAX_COMMENTS = 10;
let comments = [];

// Max Character Length and Character Counts
const MAX_NAME_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;


document.getElementById('user-comment').addEventListener('input', function(e) {
    const remaining = MAX_COMMENT_LENGTH - e.target.value.length;
    document.getElementById('char-count').textContent = `${remaining} characters remaining`;
});

// Handles the form submissions from visitors
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const text = document.getElementById('user-comment').value.trim();
    
    if (!name || !text) {
        alert('Please enter both your name and a comment!');
        return;
    }
    
    // Creates the comment object!
    const comment = {
        name: name,
        text: text,
        date: new Date().toLocaleString()
    };
    
    // Adds comments to the beginning of the array
    comments.unshift(comment);
    
    // Keeps only the 10 most recent comments
    if (comments.length > MAX_COMMENTS) {
        comments = comments.slice(0, MAX_COMMENTS);
    }
    
    // Clears the form
    document.getElementById('userName').value = '';
    document.getElementById('user-comment').value = '';
    
    // Updates the display
    renderComments();
});

// Renders the comments to the page
function renderComments() {
    const container = document.getElementById('comments-display');
    
    if (comments.length === 0) {
        container.innerHTML = '<div class="no-comments">No comments yet. Be the first!</div>';
        return;
    }
    
    container.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-name">${escapeHtml(comment.name)}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-date">${comment.date}</div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
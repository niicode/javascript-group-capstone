import { involvementApiBaseURL, uniqueID } from "./variables";

class CommentsApi {
  static addComments (id, comment, username) {
    const url = `${involvementApiBaseURL}apps/${uniqueID}/comments`;
    const data = {
      item_id: id,
      username,
      comment,
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 201) {
          const commentAlert = document.querySelector('.comment-alert');
          commentAlert.style.color = 'green';
          commentAlert.innerHTML = 'Comment added successfully';
          setTimeout(() => {
            commentAlert.innerHTML = '';
          }, 5000);
        } else {
          const commentAlert = document.querySelector('.comment-alert');
          commentAlert.style.color = 'red';
          commentAlert.innerHTML = 'Comment failed to add';
        }
      })
  }

  static getComments = async (id) => {
    const url = `${involvementApiBaseURL}apps/${uniqueID}/comments?item_id=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.error !== undefined) {
      return false;
    }
    return data;
  }
}

export const commentsCount = (data) => data.length;


export default CommentsApi;